historicosDolar();
actualizacionHora();
cargarTabla();

const selectElement = document.getElementById('moneda-select');
const button = document.querySelector('.button-send');
const inputFecha = document.getElementById('fecha-input');


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

botonActualizarHora = document.querySelector('.button-time')
botonActualizarHora.addEventListener('click', actualizacionHora);

// evento q capta cuando se selecciona un tipo de dolar
button.addEventListener('click',() => {
  const selectValue = selectElement.value

  console.log('Selected value:', selectValue);

  historicosTipoDeDolar(selectValue);
  limpiarTabla();
  cargarTablaTipoDolar(selectValue);
})

inputFecha.addEventListener('change',() => {
  const selectValue = selectElement.value
  
  
  const fechaSeleccionada = inputFecha.value;
  //console.log(inputFecha)
  console.log('Selected value:', selectValue);
  console.log('Fecha seleccionada:', fechaSeleccionada);
  //const partesFecha = fechaSeleccionada.split('-');
  //const nuevaFecha = partesFecha.join('/');
  //console.log(nuevaFecha)
  limpiarTabla();


  fetch(`/get-cotizaciones?casa=${selectValue}&fecha=${fechaSeleccionada}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    
    // const tbody = document.querySelector(".table tbody");
    // const fila = document.createElement('tr');
  
    // const fecha = document.createElement('td')
    // fecha.textContent = data[0].fecha
  
    // const casa = document.createElement('td')
    // casa.textContent = data.casa
  
    // const compra = document.createElement('td')
    // compra.textContent = data.compra
  
    // const venta = document.createElement('td')
    // venta.textContent = data.venta
    // fila.appendChild(fecha);
    // fila.appendChild(casa);
    // fila.appendChild(compra);
    // fila.appendChild(venta);
  
    // tbody.appendChild(fila)
  

  } 
);  

  
  //cargarTablaTipoDolarFecha(selectValue, fechaSeleccionada);

})



// funcion que me grafica todos los dolares
async function historicosDolar() {
  try {
    
    const response = await fetch('/get-cotizaciones')
    const jsonData = await response.json();
    console.log(jsonData);

    let xAxisData = [];
    let yAxisData = [];

    jsonData.forEach(item => {
    xAxisData.push(item.fecha);
    yAxisData.push(item.venta);  
    
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
  dataZoom: [{
    type: 'inside',
    start: 0,
    end: 100
  }, {
    type: 'slider',
    start: 0,
    end: 100
  }],
  yAxis: {},
  series: [
    {
      name: 'dolar',
      type: 'line',
      data: yAxisData
    }
  ]
};

// Paso las opciones como parametros de mi grafico.
myChart.setOption(option);
// Función para actualizar el gráfico cuando se selecciona un rango
myChart.on('brush', function (params) {
  var range = params.batch[0].range;
  // Actualiza las opciones del gráfico con el nuevo rango
  option.xAxis.min = range[0];
  option.xAxis.max = range[1];
});
  } catch (error) {
    console.error('Error:', error);
  }
}


// funcion que grafica por tipo de dolar
async function historicosTipoDeDolar(tipoDolar) {
  try {
    
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


// funcion para cargar tabla de datos de todos los tipos de dolar

async function cargarTabla() {

  try {

  const response = await fetch('/get-cotizaciones');
  if (!response.ok) {
    throw new Error('Error al obtener los datos');
  }

  const datos = await response.json();

  const tbody = document.querySelector(".table tbody");

  datos.forEach((item)=> {
    const fila = document.createElement('tr');

    const fecha = document.createElement('td')
    fecha.textContent = item.fecha

    const casa = document.createElement('td')
    casa.textContent = item.casa

    const compra = document.createElement('td')
    compra.textContent = item.compra

    const venta = document.createElement('td')
    venta.textContent = item.venta

    fila.appendChild(fecha);
    fila.appendChild(casa);
    fila.appendChild(compra);
    fila.appendChild(venta);

    tbody.appendChild(fila)
  });
}
 catch (error) {
    console.error('Error cargando los datos: ', error);
}
}

// funcion para cargar tabla de datos segun tipo de dolar

async function cargarTablaTipoDolar(tipoDolar) {

  try {

  const response = await fetch(`/get-cotizaciones/${tipoDolar}`);
  if (!response.ok) {
    throw new Error('Error al obtener los datos');
  }

  const datos = await response.json();

  const tbody = document.querySelector(".table tbody");

  datos.forEach((item)=> {
    const fila = document.createElement('tr');

    const fecha = document.createElement('td')
    fecha.textContent = item.fecha

    const casa = document.createElement('td')
    casa.textContent = item.casa

    const compra = document.createElement('td')
    compra.textContent = item.compra

    const venta = document.createElement('td')
    venta.textContent = item.venta

    fila.appendChild(fecha);
    fila.appendChild(casa);
    fila.appendChild(compra);
    fila.appendChild(venta);

    tbody.appendChild(fila)
  });
}
 catch (error) {
    console.error('Error cargando los datos: ', error);
}
}

//function para traer tipo de cambio por fecha
// async function cargarTablaTipoDolarFecha(tipoDolar, fecha) {
//   try {
//     const response = await fetch(`/get-cotizaciones?casa=${tipoDolar}&fecha=${fecha}`);
//     if (!response.ok) {
//       throw new Error('Error al obtener los datos');
//     }
//     const datos = await response.json();
//     //console.log(datos);
//     const tbody = document.querySelector(".table tbody");

//   datos.forEach((item)=> {
//     const fila = document.createElement('tr');

//     const fecha = document.createElement('td')
//     fecha.textContent = item.fecha

//     const casa = document.createElement('td')
//     casa.textContent = item.casa

//     const compra = document.createElement('td')
//     compra.textContent = item.compra

//     const venta = document.createElement('td')
//     venta.textContent = item.venta

//     fila.appendChild(fecha);
//     fila.appendChild(casa);
//     fila.appendChild(compra);
//     fila.appendChild(venta);

//     tbody.appendChild(fila)
    
//   }); 
//   }
//   catch (error) {
//     console.error('Error cargando los datos: ', error);
// }
// }

function limpiarTabla() {
  const tabla = document.querySelector("table"); 
  const tbody = tabla.querySelector(".table tbody");
  tbody.innerHTML = "";
}









