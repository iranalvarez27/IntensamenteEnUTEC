# main.py
from utilidades import abrir_imagen_grises, abrir_imagen_rgb, seleccionar_imagen, seleccionar_posicion, mostrar_y_guardar
from mask import obtener_mascara
from blending import mezcla_poisson

# -------------------- MAIN --------------------

def main():
    # Preguntamos al usuario que modo desea usar
    print("Selecciona el modo de blending:")
    print("1. Normal Poisson")
    print("2. Mixed Gradients")
    opcion = input("Ingresa 1 o 2: ").strip()
    modo = 'mixed' if opcion == '2' else 'normal'
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

    resultado = mezcla_poisson(canales_src_crop, canales_dst, mascara, esquina, modo=modo)
    mostrar_y_guardar(resultado, "output/resultado_poisson_" + modo)

if __name__ == "__main__":
    main()