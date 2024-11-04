import requests

response = requests.get('https://dolarapi.com/v1/dolares')

if response.status_code == 200:
    data = response.json()

    