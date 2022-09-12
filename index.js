const destinos_index = document.getElementById("destinos_index");
const destinos_detalle = document.getElementById("destinos_detalle");
let excursiones;
fetch("./excursiones.json")
  .then((response) => response.json())
  .then((data) => {
    excursiones = data;
    const irDestinos = excursiones.find((e) => e.id === id_excursion2);
    console.log(irDestinos);
    console.log(window.location.pathname);
    if (
      window.location.pathname === "/index.html" ||
      window.location.pathname === "/ProyectoJs/"
    )
      mostrarDestinos(excursiones);
    if (
      window.location.pathname === `/destino${id_excursion2}.html` ||
      window.location.pathname === `/ProyectoJs/destino${id_excursion2}.html`
    )
      mostrarDetalle(irDestinos);
  });

let id_excursion;

const mostrarDestinos = (array) => {
  array.forEach((element) => {
    const excursiones_hijo = document.createElement("div");
    excursiones_hijo.classList.add(
      "col-md-3",
      "d-flex",
      "justify-content-center",
      "mt-5"
    );
    excursiones_hijo.innerHTML = `
            <div class="card" style="width: 18rem">
              <img
                src="./multimedia/destinos/montaña_nieve.webp"
                class="card-img-top"
                alt="Cart que muestra una presvisualizacion de la montaña nevada a la que se refiere el destino."
              />
              <div class="card-body card__bg">
                <h3 class="card-title h3__secciones"> ${element.nombre}</h3>
                <p>${element.puntuacion} ${
      element.puntuacion > 7.5 ? "Fantastico" : "Bueno"
    } ${element.comentarios} comentarios</p>
                <p>Reserva flexible</p>
                <p>Conoce los ${element.region}</p>
                <div>Precio por adulto desde ${element.precio}</div>
                <div class="d-flex justify-content-end" id="ir_destino${
                  element.id
                }">
                  <a href=${element.url} class="btn boton"
                    >Ver mas</a
                  >
                </div>
                <div class="card_precio"></div>
              </div>
            </div>
          `;

    destinos_index.prepend(excursiones_hijo);
    const boton = document.getElementById(`ir_destino${element.id}`);
    boton.addEventListener("click", () => {
      id_excursion = element.id;
      localStorage.setItem("id_excursion", JSON.stringify(id_excursion));
    });
  });
};

const mostrarDetalle = (object) => {
  const excursiones_hijo = document.createElement("div");
  excursiones_hijo.classList.add("row", "card2");
  excursiones_hijo.innerHTML = `<div class="col-md-9 card_left d-flex flex-column justify-content-end border-end ">
            <div class="border-bottom">
              <h4 class="titulo_act">${object.nombre}</h4>
              <div class="d-flex">
                <p class="datos_extra">Duración: ${
                  object.duracion
                }. Disponible: ${object.disponible}</p>
              </div>
            </div>
            <div class="border-bottom">
              <h3 class="incluye_act mt-5">Incluye</h3>
              <span class="incluye_desc">${object.short_desc}</span
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
                <select class ="redondeado"name="hora_excursion" id="hora">${object.horas.map(
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
              <span class="mt-5">$${object.precio} </span>
              <div class="d-flex justify-content-center flex-column ">
              <button class="redondeado boton ">Comprar</button>
              <button class="redondeado boton mt-2">Agregar</button>
              
              </div>
            </div>
          </div>`;
  destinos_detalle.prepend(excursiones_hijo);
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
  let fecha = document.getElementById("date");

  fecha.addEventListener("change", (e) => {
    console.log(e.target.value);
  });
};

let id_excursion2 = JSON.parse(localStorage.getItem("id_excursion"));
