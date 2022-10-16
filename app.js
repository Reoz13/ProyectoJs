const contenedor = document.getElementById("container-destinos");
contenedor.innerHTML = `<h2 class="text-center mt-4">Nuestros destinos</h2>`;

const destinosPadre = document.createElement("div");
destinosPadre.classList.add(
  "mt-5",
  "destinosPadre",
  "d-flex",
  "flex-column",
  "align-items-center"
);
contenedor.append(destinosPadre);

const contenedorCarrito = document.getElementById("contenedorCarrito");

const contadorCarrito = document.getElementById("cartCount");

const precioTotal = document.getElementById("precioTotal");

const carrito = [];
let destinos = [];
fetch("./excursiones.json")
  .then((response) => response.json())
  .then((data) => {
    destinos = data;

    mostrarDestinos(destinos);
  });

const mostrarDestinos = (array) => {
  array.forEach((destino) => {
    const destinosHijo = document.createElement("div");
    destinosHijo.classList.add(
      "d-flex",
      "mostrarDestinosPadre",
      "my-3",
      "flex-column"
    );
    destinosHijo.innerHTML = `<div class="divMarco"></div>
    
    
    <div class="abajoMarco d-flex ">
    <div class="mostrarDestinos-DivImagen position-relative">
        <img src="${destino.url}" alt="" class="mostrarDestinos-img"/>
        <div class="position-absolute mostrarDestinos-cartFantasma">
          <h4>${destino.nombre}</h4>
          <div class="d-flex gap-2">
            <p><i class="bi bi-geo-alt-fill"></i> ${destino.ubicacion}</p>
            <p><i class="bi bi-clock"></i> ${destino.duracionViaje}</p>
          </div>

          <p>Incluye</p>
          <div class="d-flex flex-column justify-content-end">
            <p class="incluyeP">
              <i class="bi bi-airplane"></i> Vuelo Operado por
              Aerolíneas Argentinas
            </p>
            <p class="incluyeP"><i class="bi bi-building"></i> Alojamiento 4 noches</p>
            <p class="incluyeP">
              <i class="bi bi-bag-plus"></i> Seguro de viaje Vigencia: del 4 dic.
              2022 al 8 dic. 2022
            </p>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center mostrarDestinos-DivPrecio text-center " >
      <div><p class="agregarP">Precio final por persona.</p>
      <p class="precioReal">${formatter.format(destino.precioReal)}</p>
        <p class="precioP">${formatter.format(destino.precio)}</p>
        <button class="btn boton botonAgregar" id="agregar${
          destino.id
        }">Agregar</button>  </div>
        
        <div class="divExtraAgregar d-flex align-items-end">Viajar con nosotros es difrutar.</div>
      </div>
    </div>
    `;
    destinosPadre.prepend(destinosHijo);
    const boton = document.getElementById(`agregar${destino.id}`);
    boton.addEventListener("click", () => {
      agregarCarrito(destino.id);
    });
  });
};
const agregarCarrito = (destId) => {
  const item = destinos.find((dest) => dest.id === destId);
  carrito.push(item);
  Toastify({
    text: "Destino agregado",
    duration: 3000,
    close: true,
    gravity: "bottom", // top or bottom
    position: "left", // left, center or right
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: "tostada",
  }).showToast();

  actualizarCarrito();
};
const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  const carritoDos = new Set(carrito);
  const carritoFinal = Array.from(carritoDos);
  carritoFinal.forEach((dest) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "list-group-item-action");
    li.setAttribute("aria-current", "true");
    li.innerHTML = `<div class="d-flex w-100 justify-content-between">
     <h5 class="mb-1 nombreDestCarrito">${dest.nombre} </h5>

    <button class=" botonEliminar" id="eliminar${dest.id}">
        <i class="bi bi-trash"></i>
    </button>
    </div> 
    <p class="mb-1 nombreUbiDest">${dest.ubicacion}</p>

    <div class="d-flex w-100 justify-content-between">

        <p>Personas: <button id="restarCantidad${
          dest.id
        }"class="botonCantidadPersonas me-2">-</button>
            <span id="cantidadContador${dest.id}">${
      dest.cantidadPersonas
    }</span>
            <button id="sumarCantidad${
              dest.id
            }"class="botonCantidadPersonas ms-2">+</button>
        </p>
    <p class="d-flex flex-column pPrecioPorPersona">Precio por persona: 
    <span>${formatter.format(dest.precio)}</span></p>
    </div>

    <p id="subPrecio${dest.id}">Precio: ${formatter.format(dest.precio)}</p>`;
    contenedorCarrito.append(li);
    const boton = document.getElementById(`eliminar${dest.id}`);
    boton.addEventListener("click", () => {
      eliminarDelCarrito(dest.id);
      cuentaFinal();
    });
    let restarCantidad = document.getElementById(`restarCantidad${dest.id}`);
    let sumarCantidad = document.getElementById(`sumarCantidad${dest.id}`);
    let cantidadContador = document.getElementById(
      `cantidadContador${dest.id}`
    );
    let acumulador = dest.cantidadPersonas;
    restarCantidad.addEventListener("click", () => {
      if (acumulador > 1) {
        acumulador--;
      }
      cantidadContador.innerText = acumulador;
      dest.cantidadPersonas = acumulador;
      const subPrecio = document.getElementById(`subPrecio${dest.id}`);
      let subPrecioAcumulador = 0;
      subPrecioAcumulador = acumulador * dest.precio;
      subPrecio.innerHTML = `Precio: $${subPrecioAcumulador}`;
      cuentaFinal();
    });
    sumarCantidad.addEventListener("click", () => {
      acumulador++;
      cantidadContador.innerText = acumulador;
      dest.cantidadPersonas = acumulador;
      const subPrecio = document.getElementById(`subPrecio${dest.id}`);
      let subPrecioAcumulador = 0;
      subPrecioAcumulador = acumulador * dest.precio;
      subPrecio.innerHTML = `Precio: ${formatter.format(subPrecioAcumulador)}`;
      cuentaFinal();
    });
  });

  //   contadorCarrito.innerText = carritoFinal.lemgth;
  //   console.log(carritoFinal);
  //   if (contadorCarrito === 0) {
  //     contadorCarrito.classList.add("invisible");
  //   } else {
  //     contadorCarrito.classList.remove("invisible");
  //   }
  cuentaFinal();
};
let precioFinal = 0;
const cuentaFinal = () => {
  const carritoDos = new Set(carrito);
  const carritoFinalFinal = Array.from(carritoDos);
  precioFinal = carritoFinalFinal.reduce(
    (acc, dest) => acc + dest.precio * dest.cantidadPersonas,
    0
  );
  precioTotal.innerText = `${formatter.format(precioFinal)}`;
};

const eliminarDelCarrito = (destId) => {
  const carritoDos = new Set(carrito);
  const carritoFinalFinal = Array.from(carritoDos);
  const item = carritoFinalFinal.find((dest) => dest.id === destId);
  const indice = carritoFinalFinal.indexOf(item);
  do {
    carrito.splice(indice, 1);
  } while (carrito.find((dest) => dest.id === destId));
  actualizarCarrito();
};

// Boton comprar api mercadopago
const botonComprar = document.getElementById("botonFinalizarCompra");

botonComprar.addEventListener("click", () => {
  const carritoDos = new Set(carrito);
  const carritoFinalFinal = Array.from(carritoDos);

  if (carritoFinalFinal.length === 0) {
    Toastify({
      text: "No hay productos en el carrito",
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      className: "tostada",
    }).showToast();
  } else {
    const carritoAMP = carritoFinalFinal.map((item) => {
      return {
        title: item.nombre,
        description: item.marca,
        picture_url: item.img,
        category_id: item.id,
        quantity: item.cantAVender,
        currency_id: "ARS",
        unit_price: item.precio,
      };
    });
    fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer TEST-3836172684719657-112020-8d1296aad608c6c9d82f0215a73a86ca-1023132629",
      },
      body: JSON.stringify({
        items: carritoAMP,
        back_urls: {
          success: window.location.href,
          failure: window.location.href,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        window.location.replace(data.init_point);
      });
  }
});

var formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});
