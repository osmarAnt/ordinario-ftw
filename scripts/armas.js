// Aquí se guardan todas las armas cargadas desde el XML.
// Esto permite filtrar los datos sin volver a cargar el archivo XML.
let listaArmas = [];

// Elementos del HTML
const tabla = document.getElementById("tabla-armas");
const filtroArma = document.getElementById("filtro-arma");
const filtroTipoArma = document.getElementById("filtro-tipo-arma");

// Petición para cargar el archivo XML
const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        cargarArmas(this);
    }
};

xhttp.open("GET", "../xml/armas.xml", true);
xhttp.send();

function cargarArmas(xmlRequest) {
    const xml = xmlRequest.responseXML;

    // Obtenemos todas las etiquetas <arma> del XML
    const armas = xml.getElementsByTagName("arma");

    for (let i = 0; i < armas.length; i++) {
        const nombre = armas[i].getElementsByTagName("nombre")[0].textContent;
        const descripcion = armas[i].getElementsByTagName("descripcion")[0].textContent;
        const imagen = armas[i].getElementsByTagName("imagen")[0].textContent;

        // Guardamos cada arma como objeto
        const arma = {
            nombre: nombre,
            descripcion: descripcion,
            imagen: imagen
        };

        // Agregamos el arma a la lista general
        listaArmas.push(arma);
    }

    // Cuando ya cargaron todas las armas, las mostramos en la tabla
    mostrarArmas(listaArmas);
}

// Esta función recibe una lista de armas y las muestra en la tabla.
// Puede recibir todas las armas o solo las filtradas.
function mostrarArmas(armas) {
    // Limpiamos la tabla para evitar filas duplicadas al filtrar
    tabla.innerHTML = "";

    armas.forEach(arma => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <img src="${arma.imagen}" alt="Imagen de ${arma.nombre}" width="100">
            </td>
            <td>${arma.nombre}</td>
            <td>${arma.descripcion}</td>
        `;

        tabla.appendChild(fila);
    });
}

// Esta función filtra por texto y por el select de tipo de arma
function filtrarArmas() {
    const textoBuscado = filtroArma.value.toLowerCase();
    const armaSeleccionada = filtroTipoArma.value;

    const armasFiltradas = listaArmas.filter(arma => {
        const nombre = arma.nombre.toLowerCase();
        const descripcion = arma.descripcion.toLowerCase();

        // Coincide si el texto aparece en el nombre o en la descripción
        const coincideTexto =
            nombre.includes(textoBuscado) ||
            descripcion.includes(textoBuscado);

        // Coincide si no se eligió nada en el select,
        // o si el nombre del arma es igual al seleccionado
        const coincideSelect =
            armaSeleccionada === "" ||
            arma.nombre === armaSeleccionada;

        return coincideTexto && coincideSelect;
    });

    mostrarArmas(armasFiltradas);
}

// Cada vez que escribes en el input, se filtra automáticamente
filtroArma.addEventListener("input", filtrarArmas);

// Cada vez que cambias el select, se filtra automáticamente
filtroTipoArma.addEventListener("change", filtrarArmas);