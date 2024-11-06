from flask import Flask, jsonify
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

# Ejemplo de uso
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

if __name__ == '__main__':
    app.run(debug=True)

















