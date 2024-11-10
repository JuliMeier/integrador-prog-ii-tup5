from flask import Flask, jsonify, json, render_template
from flask_cors import CORS
import requests
# from datetime import datetime

app = Flask(__name__)
CORS(app)

class Cotizacion:
    def __init__(self, compra, venta, casa, fecha_actualizacion):
        self.compra = compra
        self.venta = venta
        self.casa = casa
        self.fecha_actualizacion = fecha_actualizacion

    def to_dict(self):
        return {
            "compra": self.compra,
            "venta": self.venta,
            "casa": self.casa,
            "fecha_actualizacion": self.fecha_actualizacion
        }

    def __str__(self):
        return f"{self.casa} - Compra: {self.compra}, Venta: {self.venta}, Fecha: {self.fecha_actualizacion}"

class Divisa:
    def __init__(self, nombre, moneda):
        self.nombre = nombre
        self.moneda = moneda
        self.cotizaciones = []

    def agregar_cotizacion(self, cotizacion):
        self.cotizaciones.append(cotizacion)

    def obtener_cotizacion(self, casa):
        for cotizacion in self.cotizaciones:
            if cotizacion.casa == casa:
                return cotizacion
        return None

    def to_dict(self):
        return {
            "nombre": self.nombre,
            "moneda": self.moneda,
            "cotizaciones": [c.to_dict() for c in self.cotizaciones]
        }  

    def __str__(self):
        return f"{self.nombre} ({self.moneda}) - Cotizaciones: {[str(c) for c in self.cotizaciones]}"


class APICliente:
    BASE_URL = 'https://dolarapi.com/v1'

    def obtener_cotizaciones(self, moneda=None):
        url = f"{self.BASE_URL}/cotizaciones"
        params = {'moneda': moneda} if moneda else {}
        response = requests.get(url, params=params)
        data = response.json()
        
        return self._procesar_datos(data)

    def obtener_dolares(self):
        url = f"{self.BASE_URL}/dolares"
        response = requests.get(url)
        data = response.json()
        
        return self._procesar_datos(data)

    def _procesar_datos(self, data):
        divisas = {}
        for item in data:
            nombre = item["nombre"]
            moneda = item["moneda"]
            casa = item["casa"]
            compra = item["compra"]
            venta = item["venta"]
            fecha_actualizacion = item["fechaActualizacion"]

            cotizacion = Cotizacion(compra, venta, casa, fecha_actualizacion)
            
            if nombre not in divisas:
                divisas[nombre] = Divisa(nombre, moneda)
                
            divisas[nombre].agregar_cotizacion(cotizacion)

        return divisas


cliente = APICliente()

# Endpoint para obtener todas las cotizaciones
@app.route('/cotizaciones', methods=['GET'])
def cotizaciones():
    divisas = cliente.obtener_cotizaciones()
    divisas_dict = {nombre: divisa.to_dict() for nombre, divisa in divisas.items()}
    return jsonify(divisas_dict)

# Endpoint para obtener solo las cotizaciones del dólar
@app.route('/dolares', methods=['GET'])
def dolares():
    divisas = cliente.obtener_dolares()
    divisas_dict = {nombre: divisa.to_dict() for nombre, divisa in divisas.items()}
    return jsonify(divisas_dict)


# traigo los historicos de dolares
@app.route('/get-cotizaciones', methods=['GET'])
def get_cotizaciones():
    url = "https://api.argentinadatos.com/v1/cotizaciones/dolares"
    response = requests.get(url)

    if response.status_code == 200:
        return jsonify(response.json())
    else: 
        return jsonify({'error':'No se pudo obtener los datos'}), 500
    
# Ruta para obtener cotizaciones por tipo de dólar
@app.route('/get-cotizaciones/<tipoDolar>', methods=['GET'])
def get_cotizaciones_tipo(tipoDolar):
    url = f"https://api.argentinadatos.com/v1/cotizaciones/dolares/{tipoDolar}"
    response = requests.get(url)
    
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "No se pudo obtener los datos"}), 500


# Creo la ruta de inicio
@app.route('/')
def index():
    return render_template('datos.html')

# ruta de historicos
@app.route('/historicos')
def historicos():
    return render_template('historicos.html')

if __name__ == '__main__':
    app.run(debug=True)


# creacion de formulario de mail 
''' 
data = {
    'service_id': 'service_f725wuh',
    'template_id': 'contact_form',
    'user_id': 'eJQHnC2jp-xM1PhsD',
    'template_params': {
        'from_name': 'James',
        'to_name': 'Seba',
        'message': 'Este es el mensaje'
    }
}

headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'en-US,en;q=0.9',
    'Origin': 'https://your-website.com',  
    'Referer': 'https://your-website.com/'
}

try:
    response = requests.post(
        'https://api.emailjs.com/api/v1.0/email/send',
        data=json.dumps(data),
        headers=headers
    )
    response.raise_for_status()
    print('Your mail is sent!')
except requests.exceptions.RequestException as error:
    print(f'Oops... {error}')
    if error.response is not None:
        print(error.response.text)

'''
















