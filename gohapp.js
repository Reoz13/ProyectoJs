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
    excursiones_hijo.innerHTML = `<div
            class="col-md-10 card_left d-flex flex-column justify-content-end border-end"
          >
            <div class="border-bottom">
              <h4>${element.nombre}</h4>
              <div class="d-flex">
                <p>Duración: ${element.duracion}.</p>
              </div>
            </div>

            <div class="border-bottom">
              <h3>Incluye</h3>
              <span
                >${element.short_desc}</span
              >
              <!-- aca va esto En este recorrido por el Parque Ischigualasto - Valle de la Luna disfrutarás de paisajes de otro mundo. Ven a recorrer esta maravilla natural que te impresionará por sus formaciones rocosas y colores rojizos. -->
            </div>

            <div class="d-flex gap-3">
              <div>
                <h3>Fecha</h3>
                <input type="date" name="date_excursion" id="date" />
              </div>
              <div>
                <h3>Hora</h3>
                <select name="hora_excursion" id="hora">${element.horas.map(
                  (f) => `<option value=${f}>${f}</option>`
                )}</select>
              </div>
              <div>
                <h3>Cantida de personas</h3>
                <button
                  type="button"
                  class="btn btn-lg"
                  data-bs-toggle="popover"
                  data-bs-title="Popover title"
                  data-bs-content="+ personas"
                >
                  1 persona
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-2 d-flex">
            <div class="precio d-flex flex-column">
              <h3>Precio final por 1 adulto</h3>
              <span>$${element.precio} </span>
              <button>Comprar</button>
              <button>Agregar</button>
            </div>
          </div>`;
    excursionesPadre.prepend(excursiones_hijo);
  });
};

let fecha = document.getElementById("date");

fecha.addEventListener("change", () => {
  console.log(fecha.value);
});
