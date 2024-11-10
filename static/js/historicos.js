historicosDolar();

const selectElement = document.getElementById('moneda-select');
const button = document.querySelector('.button-send');

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
    const response = await fetch("https://api.argentinadatos.com/v1/cotizaciones/dolares");
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
    const response = await fetch(`https://api.argentinadatos.com/v1/cotizaciones/dolares/${tipoDolar}`);
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








