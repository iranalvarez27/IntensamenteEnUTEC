import numpy as np
from scipy.sparse import lil_matrix
from pyamg import ruge_stuben_solver

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