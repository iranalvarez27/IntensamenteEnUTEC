import numpy as np
from poisson import construir_sistema, resolver_sistema, reconstruir_imagen

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