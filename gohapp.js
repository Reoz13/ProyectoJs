const excursionesPadre = document.getElementById("excursionesPadre");

let excursiones = [];
fetch("./excursiones.json")
  .then((response) => response.json())
  .then((data) => {
    excursiones = data;
    mostrarExcursiones(excursiones);
  });

const mostrarExcursiones = (array) => {
  array.forEach((element) => {
    const excursiones_hijo = document.createElement("div");
    excursiones_hijo.classList.add("row", "card2");
    excursiones_hijo.innerHTML = `<div class="col-md-9 card_left d-flex flex-column justify-content-end border-end ">
            <div class="border-bottom">
              <h4 class="titulo_act">${element.nombre}</h4>
              <div class="d-flex">
                <p class="datos_extra">Duración: ${
                  element.duracion
                }. Disponible: ${element.disponible}</p>
              </div>
            </div>

            <div class="border-bottom">
              <h3 class="incluye_act mt-5">Incluye</h3>
              <span class="incluye_desc">${element.short_desc}</span
              >
              <!-- aca va esto En este recorrido por el Parque Ischigualasto - Valle de la Luna disfrutarás de paisajes de otro mundo. Ven a recorrer esta maravilla natural que te impresionará por sus formaciones rocosas y colores rojizos. -->
            </div>

            <div class="d-flex gap-3 mt-5">
              <div>
                <h3 class="datos_reserva">Fecha</h3>
                <input class="redondeado"type="date" name="date" id="date" />
              </div>
              <div>
                <h3 class="datos_reserva">Hora</h3>
                <select class ="redondeado"name="hora_excursion" id="hora">${element.horas.map(
                  (f) => `<option value=${f}>${f}</option>`
                )}</select>
              </div>
              <div>
                <h3 class="datos_reserva">Cantida de personas</h3>
                <button
                  type="button"
                  class="btn btn-lg redondeado"
                  data-bs-toggle="popover"
                  data-bs-title="Popover title"
                  data-bs-content="+ personas"
                >
                  1 persona
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-3 d-flex">
            <div class="precio d-flex flex-column">
              <h3 class="m-3 precio">Precio final por 'x' persona</h3>
              <span class="mt-5">$${element.precio} </span>

              <div class="d-flex justify-content-center flex-column ">
              <button class="redondeado boton ">Comprar</button>
              <button class="redondeado boton mt-2">Agregar</button>
              
              </div>
            </div>
          </div>`;
    excursionesPadre.prepend(excursiones_hijo);

    let fecha = document.getElementById("date");

    fecha.addEventListener("change", (e) => {
      console.log(e.target.value);
    });
  });
};
