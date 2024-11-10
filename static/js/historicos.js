historicosDolar();
actualizacionHora();

const selectElement = document.getElementById('moneda-select');
const button = document.querySelector('.button-send');

function actualizacionHora(){
  fetch('http://127.0.0.1:5000/dolares')
  .then(response => response.json())
  .then((data) => {
    
    let horaApi = data['Blue']['cotizaciones'][0].fecha_actualizacion
    const fecha = new Date(horaApi);
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const fechaFormateada = fecha.toLocaleString('es-ES', opciones);
    document.querySelector("#hora").innerHTML = fechaFormateada;
  })
}

// evento q capta cuando se selecciona un tipo de dolar
button.addEventListener('click',() => {
  const selectValue = selectElement.value

  console.log('Selected value:', selectValue);
  fetch(`https://api.argentinadatos.com/v1/cotizaciones/dolares/${selectValue}`)
  .then(response => response.json())
  .then(data => console.log(data));

  historicosTipoDeDolar(selectValue);
})



// funcion que me grafica todos los dolares
async function historicosDolar() {
  try {
    //const response = await fetch("https://api.argentinadatos.com/v1/cotizaciones/dolares");
    const response = await fetch('/get-cotizaciones')
    const jsonData = await response.json();
    console.log(jsonData);

    let xAxisData = [];
    let yAxisData = [];

    jsonData.forEach(item => {
    xAxisData.push(item.fecha);
    yAxisData.push(item.venta);
      // You can use 'venta' or any other relevant value
    
    });



// Initialize the echarts instance based on the prepared dom
var myChart = echarts.init(document.getElementById('main'));

// Specify the configuration items and data for the chart
var option = {
  title: {
    text: 'Evolución Historica del Dolar'
  },
  tooltip: {},
  legend: {
    data: ['']
  },
  xAxis: {

    data: xAxisData
  },
  yAxis: {},
  series: [
    {
      name: 'dolar',
      type: 'line',
      data: yAxisData
    }
  ]
};

// Display the chart using the configuration items and data just specified.
myChart.setOption(option);
  
  } catch (error) {
    console.error('Error:', error);
  }
}


// funcion que grafica por tipo de dolar
async function historicosTipoDeDolar(tipoDolar) {
  try {
    //const response = await fetch(`https://api.argentinadatos.com/v1/cotizaciones/dolares/${tipoDolar}`);
    const response = await fetch(`/get-cotizaciones/${tipoDolar}`)
    const jsonData = await response.json();
    console.log(jsonData);

    let xAxisData = [];
    let yAxisData = [];

    jsonData.forEach(item => {
    xAxisData.push(item.fecha);
    yAxisData.push(item.venta);
      // You can use 'venta' or any other relevant value
    
    });



// Initialize the echarts instance based on the prepared dom
var myChart = echarts.init(document.getElementById('main'));

// Specify the configuration items and data for the chart
var option = {
  title: {
    text: 'Evolución Historica del Dolar'
  },
  tooltip: {},
  legend: {
    data: ['']
  },
  xAxis: {

    data: xAxisData
  },
  yAxis: {},
  series: [
    {
      name: 'dolar',
      type: 'line',
      data: yAxisData
    }
  ]
};

// Display the chart using the configuration items and data just specified.
myChart.setOption(option);

  } catch (error) {
    console.error('Error:', error);
  }
}








