import numpy as np
from PIL import Image
import os
from pathlib import Path
import tkinter as tk
from tkinter import filedialog

'''
Idea del paper
Convertimos RGB a LMS a lab. Ajustamos media y std (normalizo y remapeo) 
y regresamos al espacio de color RGB
Conceptos:
- LMS(Long,Medium,Short) es un espacio de color basado en la respuesta de los conos del ojo humano
  Se calcula convirtiendo asi: RGB -> XYZ -> LMS. 

- LAlphaBetha (lab) es un espacio de color decorrelacionado derivado de LMS. 
    L:Luminancia
    A:Componente de color verde-rojo
    B:Componente de color azul-amarillo
    Es decir, LMS=como los ojos reciben la luz.
              lab=como el cerebro procesa diferencias de color y brillo para interpretar el mundo.
'''

#---------------- Imagenes ------------------#

def cargar_imagen(ruta_archivo):
    img = Image.open(ruta_archivo).convert("RGB")
    return np.asarray(img)/255.0

def guardar_imagen(array_img, ruta_archivo):
    img = Image.fromarray((array_img*255).astype(np.uint8))
    img.save(ruta_archivo)


#------------- Transferencia de Color------------------#

def rgb_a_lms(rgb):
    M=np.array([[0.3811, 0.5783, 0.0402],
                  [0.1967, 0.7244, 0.0782],
                  [0.0241, 0.1288, 0.8444]])
    size = rgb.shape
    rgb = rgb.reshape((-1, 3)) 
    lms = np.dot(rgb, M.T) 
    lms[lms == 0] = 1e-8 #para evitar log(0),lo convertimos a un valor muy pequeño 
    return lms.reshape(size) 

def lms_a_lab(lms):
    lms=np.log10(lms)
    M = np.array([[ 1/np.sqrt(3), 1/np.sqrt(3), 1/np.sqrt(3)],
                  [ 1/np.sqrt(6), 1/np.sqrt(6), -2/np.sqrt(6)],
                  [ 1/np.sqrt(2), -1/np.sqrt(2), 0]])
    forma = lms.shape
    lms = lms.reshape((-1, 3))
    lab = np.dot(lms, M.T)
    return lab.reshape(forma)

def lab_a_lms(lab):
    # Multiplico las matrices al lado izquierdo de [l m s]'
    M_inv=np.array([[ 1/np.sqrt(3), 1/np.sqrt(6), 1/np.sqrt(2)],
                      [ 1/np.sqrt(3), 1/np.sqrt(6), -1/np.sqrt(2)],
                      [ 1/np.sqrt(3), -2/np.sqrt(6), 0]])
    size = lab.shape
    lab= lab.reshape((-1, 3)) 
    
    #lms=np.log10(lms)
    lms=np.dot(lab, M_inv.T) 
    lms=10**lms # Esto invierte el logaritmo
    
    return lms.reshape(size)

def lms_a_rgb(lms):
    # Multiplico las matrices al lado izquierdo de [l a b]'
    M = np.array([[ 4.4679, -3.5873,  0.1193],
                  [-1.2186,  2.3809, -0.1624],
                  [ 0.0497, -0.2439,  1.2045]])
    size = lms.shape
    lms = lms.reshape((-1, 3))
    rgb = np.dot(lms, M.T) 
    return rgb.reshape(size)

def color_transfer(source, target):
    source_lms = rgb_a_lms(source)
    target_lms = rgb_a_lms(target)
    source_lab = lms_a_lab(source_lms)
    target_lab = lms_a_lab(target_lms)
    
    src_mean = np.mean(source_lab.reshape(-1,3), axis=0)
    src_std = np.std(source_lab.reshape(-1,3), axis=0)
    tgt_mean = np.mean(target_lab.reshape(-1,3), axis=0)
    tgt_std = np.std(target_lab.reshape(-1,3), axis=0)
    
    result_lab =(source_lab-src_mean)*(tgt_std/src_std)+tgt_mean

    result_lms = lab_a_lms(result_lab)
    result_rgb = lms_a_rgb(result_lms)
    
    result_rgb = np.clip(result_rgb, 0, 1)    
    return result_rgb


#------------------------- Main ------------------#

def main():
    root = tk.Tk()
    root.withdraw()
    print("Selecciona imagen fuente")
    ruta_src = filedialog.askopenfilename(title="Selecciona imagen fuente")
    print(f"Imagen '{Path(ruta_src).stem}' seleccionada")
    print("Selecciona imagen objetivo")
    ruta_tgt = filedialog.askopenfilename(title="Selecciona imagen objetivo")
    print(f"Imagen '{Path(ruta_tgt).stem}' seleccionada")

    if not ruta_src or not ruta_tgt:
        print("Error: no se seleccionaron imagenes")
        return

    img_src = cargar_imagen(ruta_src)
    img_tgt = cargar_imagen(ruta_tgt)
    
    img_resultado=color_transfer(img_src, img_tgt)
    carpeta_output = os.path.join(os.getcwd(),"output")
    
    if not os.path.exists(carpeta_output):
        os.makedirs(carpeta_output)
    
    nombre_salida = f"color_transfer_{Path(ruta_src).stem}.jpg"
    ruta_salida = os.path.join(carpeta_output, nombre_salida)

    guardar_imagen(img_resultado, ruta_salida)
    print(f"Imagen guardada en: {ruta_salida}")

if __name__ == '__main__':
    main()
