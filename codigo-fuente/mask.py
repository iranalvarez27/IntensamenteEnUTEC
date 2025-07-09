import numpy as np
import matplotlib.pyplot as plt
from skimage.draw import polygon
from utilidades import abrir_imagen_grises

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