
const cards = document.querySelector(".card-cotizaciones")


cotizacionesDolar();
cotizacionesOtras();
actualizacionHora();

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

function cotizacionesDolar() {
  fetch("http://127.0.0.1:5000/dolares")
    .then((response) => response.json())
    .then((data) => {
      // Recorre cada divisa en el objeto `data`
      for (const divisa in data) {
        if (data.hasOwnProperty(divisa)) {
          const monedaData = data[divisa];

          // Itera sobre las cotizaciones dentro de cada divisa
          monedaData.cotizaciones.forEach((cotizacion) => {
            renderizarCotizaciones(
              monedaData.nombre,
              cotizacion.compra.toLocaleString("es-ES"),
              cotizacion.venta.toLocaleString("es-ES"),
              
              
            );
          });
        }
        
      }
    })
    .catch((error) => console.error("Error al obtener datos:", error));

}


function cotizacionesOtras() {
  fetch("http://127.0.0.1:5000/cotizaciones")
    .then((response) => response.json())
    .then((data) => {
      // Recorre cada divisa en el objeto `data`
      for (const divisa in data) {
        if (data.hasOwnProperty(divisa)) {
          const monedaData = data[divisa];

          // Itera sobre las cotizaciones dentro de cada divisa
          monedaData.cotizaciones.forEach((cotizacion) => {
            renderizarCotizaciones(
              monedaData.nombre,
              cotizacion.compra.toLocaleString("es-ES"),
              cotizacion.venta.toLocaleString("es-ES"),
              
            );
          });
        }
      }
    })
    .catch((error) => console.error("Error al obtener datos:", error));
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


// // funcion para borrar las card al actualizar y que no se dupliquen.
// function actualizarCards(){
//   let cards = document.querySelectorAll(".card-cotizaciones");
//   cards.forEach(card => card.style.display = 'none');
//   cotizacionesDolar();
//   cotizacionesOtras();
  
//   }




// formulario para envio de mail

// const form = document.getElementById("contact-form");

// form.addEventListener("submit", function(event) {
//   event.preventDefault();  
 
//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;

//   // Send data to Python script using AJAX
//   fetch("/send_email", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       name: name,
//       email: email
//     })
//   })
//   .then(response => response.json())
//   .then(data => {
//     // Handle   
 
//     console.log("Email sent successfully!", data);
//   })
//   .catch(error => {
//     // Handle errors (e.g., display an error message)
//     console.error("Error sending email:", error);
//   });
// });

