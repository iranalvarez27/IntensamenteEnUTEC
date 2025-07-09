import cv2 as cv
import tkinter
from tkinter import filedialog
import numpy as np
from PIL import Image
from skimage.draw import polygon
import matplotlib.pyplot as plt
from scipy.sparse import lil_matrix
from pyamg import ruge_stuben_solver

# -------------------- UTILIDADES --------------------

'''
Esta funcion convierte una imagen en la ruta dada a escala de grises 
y la devuelve como un arreglo NumPy 2D.
'''
def abrir_imagen_grises(ruta):
    return np.asarray(Image.open(ruta).convert('L'))

'''
Esta funcion convierte una imagen RGB en tres matrices NumPy separadas 
(una por canal: rojo, verde y azul).
'''
def abrir_imagen_rgb(ruta):
    imagen = Image.open(ruta).convert('RGB')
    r, g, b = imagen.split()
    return np.asarray(r), np.asarray(g), np.asarray(b)

'''
Esta funcion permite al usuario seleccionar una imagen mediante un cuadro de diálogo 
y devuelve su ruta como cadena.
'''
def seleccionar_imagen(mensaje):
    tkinter.Tk().withdraw()
    return filedialog.askopenfilename(title=mensaje)

'''
Esta funcion permite al usuario hacer clic en la imagen para seleccionar un punto 
y devuelve sus coordenadas como (fila, columna).
'''
def seleccionar_posicion(imagen):
    plt.figure("Selecciona el centro")
    plt.imshow(imagen, cmap='gray')
    punto = plt.ginput(1, timeout=-1)  #timeout=-1 no hay limite de tiempo 
    plt.close()
    return int(punto[0][1]), int(punto[0][0])  #(fila, columna)

'''
Esta funcion combina los tres canales RGB en una imagen, la guarda como archivo .png 
con el nombre dado y lo muestra en pantalla.
'''
def mostrar_y_guardar(imagenes, nombre):
    img = Image.merge("RGB", tuple(Image.fromarray(c.astype(np.uint8)) for c in imagenes))
    img.save(nombre + ".png")
    img.show()

# -------------------- MÁSCARA --------------------

'''
Esta funcion permite al usuario dibujar un poligono sobre la imagen para 
obtener sus vertices como un array de coordenadas.
'''
def obtener_mascara(ruta):
    imagen = abrir_imagen_grises(ruta)
    plt.figure("Selecciona el polígono")
    plt.imshow(imagen, cmap='gray')
    puntos = np.asarray(plt.ginput(0, timeout=-1))
    plt.close()

    puntos = np.fliplr(puntos)
    rr, cc = polygon(puntos[:, 0], puntos[:, 1], imagen.shape)
    mascara = np.zeros(imagen.shape, dtype=np.uint8)
    mascara[rr, cc] = 1

    fila_min, fila_max = rr.min(), rr.max() + 1
    col_min, col_max = cc.min(), cc.max() + 1
    return mascara[fila_min:fila_max, col_min:col_max], fila_min, col_min

# -------------------- POISSON --------------------

'''
Esta funcion construye la matriz dispersa y el vector de gradientes para resolver el sistema de 
Poisson en la región de la máscara, usando gradientes de la fuente o los más fuertes entre fuente 
y destino.
'''
def construir_sistema(mascara, fuente, destino, usar_mixed_grad=False):
    h, w = mascara.shape
    idx_map = -np.ones((h, w), dtype=int)
    idx = 0

    for i in range(h):
        for j in range(w):
            if mascara[i, j]:
                idx_map[i, j] = idx
                idx += 1

    A = lil_matrix((idx, idx))
    b = np.zeros(idx)

    for i in range(1, h - 1):
        for j in range(1, w - 1):
            if mascara[i, j]:
                row = idx_map[i, j]
                A[row, row] = 4

                for di, dj in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    ni, nj = i + di, j + dj

                    grad_src = fuente[i, j] - fuente[ni, nj]
                    grad_dst = destino[i, j] - destino[ni, nj]

                    # Modo mixed: tomar gradiente con mayor magnitud
                    if usar_mixed_grad:
                        grad = grad_src if abs(grad_src) > abs(grad_dst) else grad_dst
                    else:
                        grad = grad_src

                    b[row] += grad

                    if mascara[ni, nj]:
                        A[row, idx_map[ni, nj]] = -1
                    else:
                        b[row] += destino[ni, nj]

    return A.tocsr(), b, idx_map

'''
Esta funcion resuelve el sistema de ecuaciones lineales Ax = b Resuelve el sistema lineal Ax=b 
usando un solver multigrid y devuelve la solución limitada entre 0 y 255.
'''
def resolver_sistema(A, b):
    solver = ruge_stuben_solver(A)
    x = solver.solve(b, tol=1e-10)
    return np.clip(x, 0, 255)

'''
Esta funcion inserta la solucion del sistema en la region de la mascara sobre 
una copia de la imagen destino, pixel por pixel.
'''
def reconstruir_imagen(idx_map, solucion, destino, mascara):
    resultado = destino.copy()
    for i in range(mascara.shape[0]):
        for j in range(mascara.shape[1]):
            if mascara[i, j]:
                resultado[i, j] = solucion[idx_map[i, j]]
    return resultado

# -------------------- BLENDING --------------------

'''
Esta funcion mezcla cada canal RGB de la imagen fuente con la destino usando Poisson blending 
(modo normal o mixed) y devuelve la imagen combinada canal por canal.
'''
def mezcla_poisson(canales_src, canales_dst, mascara, esquina, modo='normal'):
    usar_mixed = modo.lower() == 'mixed'
    resultado = []
    for c in range(3):
        fuente = canales_src[c]
        destino = recortar_region(canales_dst[c], esquina, fuente.shape)

        fuente = fuente.astype(np.float64)
        destino = destino.astype(np.float64)

        A, b, idx_map = construir_sistema(mascara, fuente, destino, usar_mixed_grad=usar_mixed)
        solucion = resolver_sistema(A, b)
        parche = reconstruir_imagen(idx_map, solucion, destino, mascara)

        destino_mod = canales_dst[c].copy()
        i, j = esquina
        h, w = parche.shape
        destino_mod[i:i+h, j:j+w] = parche
        resultado.append(destino_mod)
    return resultado

'''
Esta funcion extrae y devuelve una copia de una subregion rectangular de la imagen 
desde la esquina dada con el tamaño especificado.
'''
def recortar_region(imagen, esquina, forma):
    i, j = esquina
    h, w = forma
    return imagen[i:i+h, j:j+w].copy()


'''
Esta funcion realiza alpha blending entre la imagen fuente y la región de destino.
Idea: si alpha=1, solo se copia la fuente tal cual (sin transparencia)
      si alpha=0, solo se muestra la imagen destino tal cual
      si alpha=0.5, se mezcla al 50% entre ambas (solo queda el fondo)
'''
def mezcla_alpha(canales_src, canales_dst, mascara, esquina, alpha):
    resultado = []
    for c in range(3):
        fuente = canales_src[c].astype(np.float64)
        destino = canales_dst[c].copy().astype(np.float64)

        i, j = esquina
        h, w = fuente.shape

        # Extraigo la region destino donde se coloca la fuente
        destino_region = destino[i:i+h, j:j+w]

        # Alpha blending solo en la region de la mascara
        blended_region = destino_region.copy()
        blended_region[mascara == 1]=(alpha*fuente[mascara==1]+(1-alpha)*destino_region[mascara==1])

        destino[i:i+h, j:j+w] = blended_region
        resultado.append(destino)
    return resultado


# -------------------- MAIN --------------------

def main():
    print("Selecciona el modo de blending:")
    print("1. Normal Poisson")
    print("2. Mixed Gradients")
    print("3. Alpha Blending")
    opcion = input("Ingresa 1, 2 o 3: ").strip()
    if opcion == '2':
        modo = 'mixed'
    elif opcion == '3':
        modo = 'alpha'
    else:
        modo = 'normal'
    print(f"Modo seleccionado: {modo.upper()}")

    ruta_src = seleccionar_imagen("Imagen fuente")
    canales_src = abrir_imagen_rgb(ruta_src)
    mascara, fila_min, col_min = obtener_mascara(ruta_src)

    canales_src_crop = tuple(
        c[fila_min:fila_min+mascara.shape[0], col_min:col_min+mascara.shape[1]] for c in canales_src
    )

    ruta_dst = seleccionar_imagen("Imagen destino")
    canales_dst = abrir_imagen_rgb(ruta_dst)
    imagen_gris = abrir_imagen_grises(ruta_dst)
    esquina = seleccionar_posicion(imagen_gris)

    esquina = (
        max(0, esquina[0] - mascara.shape[0] // 2),
        max(0, esquina[1] - mascara.shape[1] // 2)
    )

    if modo == 'alpha': 
        alpha = float(input("Ingrese el valor de alpha (entre 0 y 1): ").strip())
        resultado = mezcla_alpha(canales_src_crop, canales_dst, mascara, esquina, alpha=alpha)
    else: 
        resultado = mezcla_poisson(canales_src_crop, canales_dst, mascara, esquina, modo=modo)
    mostrar_y_guardar(resultado, f"resultado_poisson_{modo}")

if __name__ == "__main__":
    main()
