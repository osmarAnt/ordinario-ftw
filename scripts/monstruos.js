// Aquí se guardan todos los monstruos cargados desde el XML.
// Esto permite filtrarlos sin volver a cargar el XML.
let listaMonstruos = [];

// Elementos del HTML
const tabla = document.getElementById("tabla-monstruos");
const filtroMonstruo = document.getElementById("filtro-monstruo");
const filtroClase = document.getElementById("filtro-clase");

// Petición para cargar el XML
const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        cargarMons(this);
    }
};

xhttp.open("GET", "../xml/monstruos.xml", true);
xhttp.send();

function cargarMons(xmlRequest) {
    const xml = xmlRequest.responseXML;

    const mons = xml.getElementsByTagName("monstruo");

    for (let i = 0; i < mons.length; i++) {
        const nombre = mons[i].getElementsByTagName("nombre")[0].textContent;
        const clase = mons[i].getElementsByTagName("clase")[0].textContent;
        const descripcion = mons[i].getElementsByTagName("descripcion")[0].textContent;
        const imagen = mons[i].getElementsByTagName("imagen")[0].textContent;

        // Guardamos cada monstruo como objeto
        const monstruo = {
            nombre: nombre,
            clase: clase,
            descripcion: descripcion,
            imagen: imagen
        };

        listaMonstruos.push(monstruo);
    }

    // Después de cargar todos los monstruos, los mostramos
    mostrarMonstruos(listaMonstruos);
}

// Esta función recibe una lista de monstruos y la pinta en la tabla.
// Puede recibir todos o solamente los filtrados.
function mostrarMonstruos(monstruos) {
    tabla.innerHTML = "";

    monstruos.forEach(monstruo => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <img src="${monstruo.imagen}" alt="Imagen de ${monstruo.nombre}" width="100">
            </td>
            <td>${monstruo.nombre}</td>
            <td>${monstruo.clase}</td>
            <td>${monstruo.descripcion}</td>
        `;

        tabla.appendChild(fila);
    });
}

// Esta función filtra por texto y por clase.
function filtrarMonstruos() {
    const textoBuscado = filtroMonstruo.value.toLowerCase();
    const claseSeleccionada = filtroClase.value;

    const monstruosFiltrados = listaMonstruos.filter(monstruo => {
        const nombre = monstruo.nombre.toLowerCase();
        const clase = monstruo.clase.toLowerCase();
        const descripcion = monstruo.descripcion.toLowerCase();

        const coincideTexto =
            nombre.includes(textoBuscado) ||
            clase.includes(textoBuscado) ||
            descripcion.includes(textoBuscado);

        const coincideClase =
            claseSeleccionada === "" ||
            monstruo.clase === claseSeleccionada;

        return coincideTexto && coincideClase;
    });

    mostrarMonstruos(monstruosFiltrados);
}

// Eventos de los filtros
filtroMonstruo.addEventListener("input", filtrarMonstruos);
filtroClase.addEventListener("change", filtrarMonstruos);