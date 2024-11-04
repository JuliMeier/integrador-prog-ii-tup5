const cards = document.querySelector(".card-cotizaciones")


cotizacionesDolar();
cotizacionesOtras();

// fetch para traer cotizaciones de dolar
function cotizacionesDolar() {
  fetch("https://dolarapi.com/v1/dolares")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        renderizarCotizaciones(data[i].nombre, data[i].compra.toLocaleString("es-ES"), data[i].venta.toLocaleString("es-ES"));
      }
      mostrarTiempoReal(data[2].fechaActualizacion);
      
    });
}

// fetch para traer otras cotizaciones
function cotizacionesOtras() {
  fetch("https://dolarapi.com/v1/cotizaciones")
    .then((response) => response.json())
    .then((data) =>
      // console.log(data)
      {
        for (let i = 0; i < data.length; i++) {
          renderizarCotizaciones(data[i].nombre, data[i].compra.toLocaleString("es-ES"), data[i].venta.toLocaleString("es-ES"));
        }
      }
    );
}

// funcion que me renderiza las card de las cotizaciones
function renderizarCotizaciones(nombre, compra, venta){
    
    let card = cards.cloneNode(true);
    
    console.log(card);

    card.querySelector(".card-name").innerHTML = `<h4>${nombre}</h4>`;
    card.querySelector("#precio-compra").innerHTML = `<span>${compra}</span>`;
    card.querySelector("#precio-venta").innerHTML = `<span>${venta}</span>`;

    card.style.display = "flex";

    document.querySelector(".card-container").appendChild(card);
}

// funcion que me trae la fecha de la api

function mostrarTiempoReal(fecha) {


    // Crea un nuevo objeto Date a partir de la fecha recibida
    const fechaObj = new Date(fecha);

    // Opciones para formatear la fecha
    const opciones = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false // Cambia a true si quieres formato de 12 horas
    };

    // Formatear la fecha
    const fechaFormateada = fechaObj.toLocaleString('es-ES', opciones);

    // Actualiza el contenido del elemento con id "hora"
    document.querySelector("#hora").innerHTML = fechaFormateada;

}

// funcion para borrar las card al actualizar y que no se dupliquen.
function actualizarCards(){
  let cards = document.querySelectorAll(".card-cotizaciones");
  cards.forEach(card => card.style.display = 'none');
  cotizacionesDolar();
  cotizacionesOtras();
  
  }




// para formatear los tipos de cambio     .toLocaleString('es-ES',{maximumFractionDigits: 2, useGrouping:"always"})






