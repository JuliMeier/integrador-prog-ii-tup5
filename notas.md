# Documentación de la Aplicación: Cotizaciones.com

Este es un proyecto desarrollado como parte del trabajo práctico final de la materia "Programación 2" de la carrera de **Técnicatura Universitaria en Programación**.

La aplicación proporciona información sobre las cotizaciones del dólar y otras monedas en diferentes casas de cambio, permite consultar las cotizaciones históricas por medio de gráficos y tablas, también permite enviar información por correo electrónico.

## Descripción del Proyecto

La aplicación está construida con **Flask**, un microframework para Python, y utiliza **HTML**, **CSS** y **JavaScript** para el frontend. La API de la aplicación se comunica con **dolarapi.com**, una fuente externa que proporciona las cotizaciones del dólar en tiempo real desde distintas casas de cambio. La aplicación permite consultar estas cotizaciones, obtener datos histórico y el envio de correo electronico.

### Funcionalidades

- **Obtener cotizaciones actuales**: Muestra las cotizaciones del dólar en varias casas de cambio.
- **Filtrar cotizaciones por fecha**: Permite filtrar las cotizaciones históricas por una fecha específica.
- **Enviar cotizaciones por correo**: Los usuarios pueden ingresar una moneda y recibir la cotización por correo electrónico.
- **Consultar cotizaciones de diferentes tipos de dólar**: La aplicación permite consultar cotizaciones de distintos tipos de dólares (oficial, mayorista, etc.) de manera gráfica por intermedio de gráfico de líneas y por tabla.

## Requisitos

- Python 3.x
- Flask
- Flask-CORS
- Requests
- EmailJS para enviar las cotizaciones por correo
- Apache ECharts para los gráficos interactivos
- Sweet Alert 2 para alertas customizables

### Instalación de Dependencias

1. **Instalar Flask**:
   ```bash
   pip install flask
   ```
2. **Instalar Flask-CORS**;
    ```bash
    pip install flask-cors
    ```
3. **Instalar Requests**;
    ```bash
    pip install requests
    ```

### Endpoints

La aplicación tiene los siguientes **endpoints** disponibles para interactuar con la API:

### 1. `/cotizaciones` (GET)
- **Descripción**: Obtiene todas las cotizaciones de todas las casas de cambio..
- **Respuesta**: Un objeto JSON con las cotizaciones de todas las casas de cambio disponibles.

### 2. `/dolares` (GET)
- **Descripción**: Obtiene las cotizaciones del dólar en las casas de cambio.
- **Respuesta**: Un objeto JSON con las cotizaciones del dólar.

### 3. `/get-cotizaciones` (GET)
- **Descripción**: Obtiene las cotizaciones históricas del dólar. Permite filtrar por `fecha` y `casa` usando parámetros en la URL.
- **Parámetros**:
  - `fecha` (opcional): Fecha de la cotización a filtrar (formato: `YYYY-MM-DD`).
  - `casa` (opcional): Nombre de la casa de cambio para filtrar las cotizaciones.
- **Respuesta**: Un objeto JSON con las cotizaciones filtradas según los parámetros.

### 4. `/get-cotizaciones/<tipoDolar>` (GET)
- **Descripción**: Obtiene las cotizaciones de un tipo específico de dólar, como "dolaroficial", "dolarblue", etc.
- **Parámetros**:
  - `tipoDolar`: El tipo de dólar a consultar (por ejemplo, `dolaroficial`, `dolarblue`, etc.).
- **Respuesta**: Un objeto JSON con las cotizaciones del tipo de dólar solicitado.

### 5. `/enviar_cotizacion` (POST)
- **Descripción**: Permite enviar las cotizaciones por correo electrónico. El usuario envía un formulario con los datos y recibe la cotización de la moneda solicitada.
- **Parámetros (en el cuerpo de la solicitud)**:
  - `moneda`: La moneda para la cual se desea obtener la cotización.
  - `nombre`: El nombre del usuario.
  - `correo`: El correo electrónico del usuario donde se enviará la cotización.
- **Respuesta**: Un objeto JSON indicando si el envío del correo fue exitoso (`success: true`) o si ocurrió un error.

---

## Rutas de la Aplicación

La aplicación también tiene las siguientes **rutas** principales para acceder a las páginas del frontend:

### 1. `/` (Página principal)
- **Descripción**: Muestra la interfaz para consultar las cotizaciones de diversas monedas.
- **Uso**: Esta es la página principal donde los usuarios pueden ver las cotizaciones actuales y buscar información sobre los tipos de cambio.

### 2. `/historicos` (Página de cotizaciones históricas)
- **Descripción**: Muestra la información de las cotizaciones históricas del dólar.
- **Uso**: En esta página, los usuarios pueden ver las cotizaciones históricas y filtrar por fecha.

### 3. `/enviar_cotizacion` (Formulario de envío de cotización)
- **Descripción**: Recibe una solicitud POST con los datos de la moneda, el nombre y correo del usuario, y envía la cotización solicitada por correo electrónico.
- **Uso**: Los usuarios pueden enviar una solicitud para recibir las cotizaciones por correo electrónico. La aplicación responde enviando un correo con la información solicitada.

