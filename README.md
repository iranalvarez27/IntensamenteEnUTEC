# 🧪 Poisson Image Blending - Fusión de Imágenes con Ecuaciones de Poisson

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge\&logo=python\&logoColor=white) ![NumPy](https://img.shields.io/badge/Numpy-013243?style=for-the-badge\&logo=numpy\&logoColor=white) ![Matplotlib](https://img.shields.io/badge/Matplotlib-11557c?style=for-the-badge\&logo=matplotlib\&logoColor=white) ![SciPy](https://img.shields.io/badge/SciPy-8CAAE6?style=for-the-badge\&logo=scipy\&logoColor=white)

---

## 👩‍💻 Integrantes

* Libra Vento
* Irán Alvarez
* Julissa Lapa
* Adrián Sandoval

---

## 📌 Introducción

Este proyecto implementa la técnica de *Poisson Image Editing*, una herramienta de edición gráfica basada en la interpolación guiada por gradientes. El objetivo es copiar una región de una imagen (fuente) y fusionarla naturalmente sobre otra (destino), respetando los bordes y texturas locales.

Inspirado en el paper de Pérez, Gangnet y Blake, esta técnica resuelve un sistema de ecuaciones diferenciales para insertar contenido visual de forma suave.

---

## 🎯 Objetivos del Proyecto

* Realizar la fusión natural entre regiones de diferentes imágenes.
* Aplicar el método de interpolación mediante ecuaciones de Poisson.
* Usar gradientes mixtos para preservar detalles importantes en transiciones visuales.
* Implementar una interfaz interactiva básica para seleccionar imágenes y regiones.

---

## 🚀 Funcionalidades

* 📌 Selección interactiva de máscara poligonal.
* 📷 Selección de punto de inserción sobre la imagen destino.
* 🎨 Fusión por canal (RGB) usando blending normal o con gradientes mixtos.
* 💾 Guardado y visualización del resultado en tiempo real.

---

## 🛠️ Tecnologías y Librerías Usadas

* **Python 3.8+**: Lenguaje de desarrollo principal.
* **NumPy**: Manipulación eficiente de arrays.
* **Matplotlib**: Visualización y selección gráfica.
* **Pillow (PIL)**: Carga y guardado de imágenes.
* **scikit-image**: Para creación de máscaras (función `polygon`).
* **SciPy**: Matrices dispersas y procesamiento numérico.
* **pyamg**: Solver multigrid rápido para el sistema de Poisson.

---

## 📂 Estructura del Proyecto

```
IntensamenteEnUTEC/
├── main.py             # Ejecución principal del flujo
├── utilidades.py       # Funciones de carga, selección y guardado
├── mask.py             # Construcción de la máscara poligonal
├── poisson.py          # Lógica matemática del sistema de ecuaciones
├── blending.py         # Lógica de interpolación por canal
├── requirements.txt    # Lista de dependencias
├── output/             # Imágenes output  
├── source/             # Imágenes fuente (Opcional)
└──target/              # Imágenes destino (Opcional)
```

---

## 🔧 Instalación

```bash
# Clona el repositorio
https://github.com/iranalvarez27/IntensamenteEnUTEC.git
cd poisson-blending

# Crea entorno virtual (opcional)
python -m venv venv
source venv/bin/activate  # o venv\Scripts\activate en Windows

# Instala las dependencias
pip install -r requirements.txt

# Ejecuta el programa
python main.py
```

---

## 📈 Flujo de Uso

1. Se abre un diálogo para elegir imagen fuente.
2. Se dibuja con clics una máscara poligonal.
3. Se elige la imagen destino y se selecciona el punto central donde pegar.
4. Se ejecuta el blending (modo normal o mixed).
5. Se guarda y muestra la imagen final.

---

## 📷 Ejemplo Visual

| Imagen Fuente                     | Imagen Destino                    | Resultado Final                                |
| --------------------------------- | --------------------------------- | ---------------------------------------------- |
| ![](source/src_sadness.jpg) | ![](target/trg_ejemplo.jpg) | ![](output/resultado_poisson_normal.png) |

---

## 📚 Referencias

* *Pérez, P., Gangnet, M., & Blake, A.* (2003). [Poisson Image Editing](https://dl.acm.org/doi/10.1145/1201775.882269)
* *Brown University - CS129 Resultados Visuales:* [https://cs.brown.edu/courses/cs129/results/proj2/taox/](https://cs.brown.edu/courses/cs129/results/proj2/taox/)
* *CMU Graphics Lecture 7 (2017):* [https://graphics.cs.cmu.edu/courses/15-463/2017\_fall/lectures/lecture7.pdf](https://graphics.cs.cmu.edu/courses/15-463/2017_fall/lectures/lecture7.pdf)
* *Zuha & Agha (Weebly Project Report):* [https://zuhaagha.weebly.com/uploads/3/1/9/5/31957175/projectreport-poisson-14100196-14100103.pdf](https://zuhaagha.weebly.com/uploads/3/1/9/5/31957175/projectreport-poisson-14100196-14100103.pdf)
* *Documentación de Scikit:* [https://scikit-image.org/](https://scikit-image.org/)
* *Documentación de Pyamg:* [https://github.com/pyamg/pyamg](https://github.com/pyamg/pyamg)
