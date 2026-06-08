const papeles = [
    "../imagenes/misiones/hoja1.png",
    "../imagenes/misiones/hoja2.png",
    "../imagenes/misiones/hoja4.png"
];
const sonidoSello = new Audio("../sonidos/menu4.mp3");
const contenedorMisiones = document.getElementById("contenedor-misiones");

const filtroNombre = document.getElementById("filtro-nombre");
const filtroDificultad = document.getElementById("filtro-dificultad");

let listaMisiones = [];

fetch("../xml/misiones.xml")
    .then(respuesta => respuesta.text())
    .then(textoXML => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(textoXML, "application/xml");

        const misiones = xml.querySelectorAll("mision");

        misiones.forEach(misionXML => {
            const titulo = misionXML.querySelector("titulo").textContent;
            const descripcion = misionXML.querySelector("descripcion").textContent;
            const dificultad = misionXML.querySelector("dificultad").textContent;
            const recompensa = misionXML.querySelector("recompensa").textContent;

            const mision = {
                titulo: titulo,
                descripcion: descripcion,
                dificultad: dificultad,
                recompensa: recompensa
            };

            listaMisiones.push(mision);
        });

        mostrarMisiones(listaMisiones);
    })
    .catch(error => {
        console.error("Error al cargar el XML:", error);
    });

function mostrarMisiones(misiones) {
    contenedorMisiones.innerHTML = "";

    misiones.forEach(mision => {
        crearMision(
            mision.titulo,
            mision.descripcion,
            mision.dificultad,
            mision.recompensa
        );
    });
}

function filtrarMisiones() {
    const textoBuscado = filtroNombre.value.toLowerCase();
    const dificultadSeleccionada = filtroDificultad.value;

    const misionesFiltradas = listaMisiones.filter(mision => {
        const titulo = mision.titulo.toLowerCase();
        const descripcion = mision.descripcion.toLowerCase();

        const coincideTexto =
            titulo.includes(textoBuscado) ||
            descripcion.includes(textoBuscado);

        const coincideDificultad =
            dificultadSeleccionada === "" ||
            mision.dificultad === dificultadSeleccionada;

        return coincideTexto && coincideDificultad;
    });

    mostrarMisiones(misionesFiltradas);
}

filtroNombre.addEventListener("input", filtrarMisiones);
filtroDificultad.addEventListener("change", filtrarMisiones);

function reproducirSello() {
    sonidoSello.currentTime = 0;
    sonidoSello.play();
}
function crearMision(titulo, descripcion, dificultad, recompensa) {
    const mision = document.createElement("div");
    mision.classList.add("mision");

    const imagenRandom = papeles[Math.floor(Math.random() * papeles.length)];
    mision.style.backgroundImage = `url(${imagenRandom})`;

    mision.innerHTML = `
        <h2>${titulo}</h2>
        <p>${descripcion}</p>

        <div class="info-extra">
            <p>Dificultad: ${dificultad}</p>
            <p>Recompensa: ${recompensa}</p>
        </div>

        <img src="../imagenes/misiones/sello.svg" class="sello" alt="Sello de misión">
    `;

    mision.addEventListener("click", () => {
        mision.classList.remove("sellada");
        void mision.offsetWidth;
        mision.classList.add("sellada");
        reproducirSello();
        console.log("Misión seleccionada:", titulo);
    });

    contenedorMisiones.appendChild(mision);
}