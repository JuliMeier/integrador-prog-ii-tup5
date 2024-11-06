   for tipo_cambio in data:
        moneda = tipo_cambio.get('moneda')
        casa = tipo_cambio.get('casa')
        compra = tipo_cambio.get('compra')
        venta = tipo_cambio.get('venta')
        fecha_actualizacion = tipo_cambio.get('fechaActualizacion')
        print(f'{moneda}\t\t {casa:.6}\t\t{compra}\t\t{venta}\t\n')