fetch('datos_historicos_usd.csv')
      .then(response => response.text())
      .then(data => {
        // Suponiendo que Papa Parse está incluido
        Papa.parse(data, {
          header: true,
          dynamicTyping: true,
          complete: function(results) {
            var data = [{
              x: results.data.map(row => row.Fecha),
              y: results.data.map(row => row.Cotizacion),
              type: 'scatter'
            }];

            var layout = {
              title: 'Cotización del Dolar'
            };

            Plotly.newPlot('grafico-container', data, layout);
          }
        });
      });