const papeles = [
    "../imagenes/misiones/hoja1.png",
    "../imagenes/misiones/hoja2.png",
    "../imagenes/misiones/hoja3.png",
    "../imagenes/misiones/hoja4.png"
];

const contenedorMisiones = document.getElementById("contenedor-misiones");

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

            crearMision(titulo, descripcion, dificultad, recompensa);
        });
    })
    .catch(error => {
        console.error("Error al cargar el XML:", error);
    });

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

        console.log("Misión seleccionada:", titulo);
    });

    contenedorMisiones.appendChild(mision);
}