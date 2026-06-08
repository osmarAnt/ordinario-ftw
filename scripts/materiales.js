// Aquí se guardan todos los materiales cargados desde el XML.
// Se guardan para poder mostrarlos y filtrarlos sin volver a cargar el archivo.
let listaMateriales = [];

// Elementos del HTML
const tablaMateriales = document.getElementById("tabla-materiales");
const filtroMaterial = document.getElementById("filtro-material");
const filtroTipo = document.getElementById("filtro-tipo");

// Imágenes según el tipo de material.
// Asegúrate de tener estas imágenes en la carpeta indicada.
const iconosMateriales = {
    escama: "../imagenes/materiales/escama.webp",
    cola: "../imagenes/materiales/cola.webp",
    glandula: "../imagenes/materiales/glandula.webp",
    piel: "../imagenes/materiales/piel.webp",
    cabeza: "../imagenes/materiales/cabeza.png",
    hueso: "../imagenes/materiales/hueso.webp",
    placa: "../imagenes/materiales/placa.png",
    gema: "../imagenes/materiales/gema.webp",
    generico: "../imagenes/materiales/generico.webp"
};

// Cargamos el XML
fetch("../xml/materiales.xml")
    .then(respuesta => respuesta.text())
    .then(textoXML => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(textoXML, "application/xml");

        const materialesXML = xml.querySelectorAll("material");

        materialesXML.forEach(materialXML => {
            const material = {
                nombre: materialXML.querySelector("nombre").textContent,
                monstruo: materialXML.querySelector("monstruo").textContent,
                tipo: materialXML.querySelector("tipo").textContent.toLowerCase(),
                rareza: materialXML.querySelector("rareza").textContent,
                obtencion: materialXML.querySelector("obtencion").textContent,
                uso: materialXML.querySelector("uso").textContent
            };

            listaMateriales.push(material);
        });

        mostrarMateriales(listaMateriales);
    })
    .catch(error => {
        console.error("Error al cargar materiales.xml:", error);
    });


// Muestra en la tabla los materiales que recibe.
// Puede mostrar todos o solo los filtrados.
function mostrarMateriales(materiales) {
    tablaMateriales.innerHTML = "";

    materiales.forEach(material => {
        const fila = document.createElement("tr");

        // Si el tipo existe en iconosMateriales, usa su imagen.
        // Si no existe, usa generico.
        const icono = iconosMateriales[material.tipo] || iconosMateriales.generico;

        // Si es placa o gema, agregamos una clase especial para remarcar rareza.
        if (material.tipo === "placa" || material.tipo === "gema") {
            fila.classList.add("material-raro");
        }

        fila.innerHTML = `
            <td>
                <img class="icono-material" src="${icono}" alt="Icono de ${material.tipo}">
            </td>
            <td>${material.nombre}</td>
            <td>${material.monstruo}</td>
            <td>${material.tipo}</td>
            <td>${material.rareza}</td>
            <td>${material.obtencion}</td>
            <td>${material.uso}</td>
        `;

        tablaMateriales.appendChild(fila);
    });
}


// Aplica filtro por texto y por tipo.
function filtrarMateriales() {
    const texto = filtroMaterial.value.toLowerCase();
    const tipoSeleccionado = filtroTipo.value;

    const materialesFiltrados = listaMateriales.filter(material => {
        const coincideTexto =
            material.nombre.toLowerCase().includes(texto) ||
            material.monstruo.toLowerCase().includes(texto) ||
            material.tipo.toLowerCase().includes(texto) ||
            material.uso.toLowerCase().includes(texto);

        const coincideTipo =
            tipoSeleccionado === "" ||
            material.tipo === tipoSeleccionado;

        return coincideTexto && coincideTipo;
    });

    mostrarMateriales(materialesFiltrados);
}


// Eventos de los filtros
filtroMaterial.addEventListener("input", filtrarMateriales);
filtroTipo.addEventListener("change", filtrarMateriales);