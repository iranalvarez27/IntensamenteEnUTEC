# Intensamente en UTEC: Documentación Técnica

La implementación de las técnicas de blending se desarrolló en Python utilizando librerías como `NumPy`, `Pillow`, `scikit-image`, `matplotlib` y `pyamg`. El enfoque se estructuró en módulos funcionales que permiten una interacción guiada con el usuario, facilitando el flujo completo desde la carga de imágenes hasta la generación de las imágenes resultado.

A continuación, se explican las funciones clave que componen la lógica del sistema:

* **Cargado y preprocesamiento de imágenes:**
  Se emplean funciones como las siguientes: `abrir_imagen_grises()` y `abrir_imagen_rgb()` para cargar imágenes en escala de grises y en formato RGB respectivamente. Estas son necesarias para calcular máscaras, extraer canales y preparar datos para el blending.

* **Selección de región y generación de máscara:**
  A través de la función `obtener_mascara()`, el usuario puede dibujar manualmente un polígono sobre la imagen fuente. Este polígono es convertido en una máscara binaria utilizando la función `polygon()` de la librería `scikit-image`, que determina qué píxeles deben copiarse a la imagen destino.

* **Blending tipo Poisson:**
  Para la técnica, se emplea la función `mezcla_poisson()`, que trabaja canal por canal (R, G, B). Esta llama internamente a:

  * `construir_sistema()`: construye la matriz dispersa y el vector `b` del sistema lineal a resolver. Este sistema se basa en la ecuación de Poisson y puede usar gradientes normales o mezclados (dependiendo del modo).
  * `resolver_sistema()`: resuelve el sistema lineal $A\mathbf{u} = \mathbf{b}$ usando un solver multigrid eficiente proporcionado por la librería `pyamg`.
  * `reconstruir_imagen()`: reconstruye la imagen destino insertando la región modificada con la solución del sistema.

  Esta técnica logra una integración suave entre la región copiada y el fondo, conservando las texturas y bordes estructurales.

* **Mixed Gradient Poisson Blending:**
  En este modo, habilitado al seleccionar la opción `2`, la función `construir_sistema()` compara los gradientes de la imagen fuente y destino en cada borde de píxel y elige el de mayor magnitud. Esto permite preservar tanto los detalles de la imagen copiada como la estructura del fondo, útil en escenarios complejos.

* **Alpha Blending:**
  La función `mezcla_alpha()` implementa blending clásico basado en un valor $\alpha \in [0, 1]$ ingresado por el usuario. La región definida por la máscara se combina como:

  [![\\ I = \alpha F + (1 - \alpha) B](https://latex.codecogs.com/svg.latex?%5C%5C%20I%20%3D%20%5Calpha%20F%20%2B%20(1%20-%20%5Calpha)%20B)](#_)

  donde $F$ es la imagen fuente y $B$ la imagen de fondo. Si $\alpha = 1$, se copia completamente la fuente; si $\alpha = 0$, se mantiene el fondo; y si $\alpha = 0.5$, se obtiene una mezcla uniforme.

* **Selección de ubicación:**
  La función `seleccionar_posicion()` permite al usuario hacer clic en la imagen destino para indicar el centro donde se colocará la región copiada. Esta coordenada se ajusta para centrar correctamente el recorte.

* **Recorte y alineamiento:**
  La función `recortar_region()` permite extraer la porción de la imagen destino que coincidirá en tamaño con la región copiada de la fuente. Esto garantiza que las operaciones se realicen sobre matrices del mismo tamaño.

* **Guardado y visualización del resultado:**
  Finalmente, la función `mostrar_y_guardar()` reconstruye la imagen RGB a partir de los tres canales modificados, guarda el resultado en un archivo `.png` y lo muestra al usuario.

* **Menú principal:**
  El bloque `main()` guía al usuario a través del flujo: selección del modo, carga de imágenes, generación de máscara, blending y guardado del resultado, lo cual hace más interactivo el programa.