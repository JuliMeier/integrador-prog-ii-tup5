from flask import Flask, jsonify, json
from flask_cors import CORS
import requests

app = Flask(__name__)

@app.route("/send_email", methods=["POST"])
def send_email():
    try:
        data_form = requests.get_json()
        name = data['name']
        email = data['email']

    data = {
    'service_id': 'service_f725wuh',
    'template_id': 'contact_form',
    'user_id': 'eJQHnC2jp-xM1PhsD',
    'template_params': {
        'from_name': 'Cotizaciones.com',
        'to_name': {name},
        'message': 'Probando'
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


