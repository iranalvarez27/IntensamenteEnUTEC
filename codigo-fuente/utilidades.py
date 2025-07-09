import tkinter
from tkinter import filedialog
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

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