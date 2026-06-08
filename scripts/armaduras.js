// Aquí se guardarán todas las piezas de armadura cargadas desde el XML.
// Esto nos sirve para llenar la tabla, llenar los selects y hacer cálculos.
let listaArmaduras = [];

// Elementos de la tabla y filtro
const tablaArmaduras = document.getElementById("tabla-armaduras");
const filtroArmadura = document.getElementById("filtro-armadura");

// Selects del simulador
const selectCasco = document.getElementById("select-casco");
const selectPechera = document.getElementById("select-pechera");
const selectGuantes = document.getElementById("select-guantes");
const selectCintura = document.getElementById("select-cintura");
const selectBotas = document.getElementById("select-botas");

// Elementos donde se mostrarán las estadísticas totales
const defensaTotal = document.getElementById("defensa-total");
const resFuego = document.getElementById("res-fuego");
const resAgua = document.getElementById("res-agua");
const resRayo = document.getElementById("res-rayo");
const resHielo = document.getElementById("res-hielo");
const resDragon = document.getElementById("res-dragon");
const listaHabilidades = document.getElementById("lista-habilidades");

// Cargamos el XML de armaduras
fetch("../xml/armaduras.xml")
    .then(respuesta => respuesta.text())
    .then(textoXML => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(textoXML, "application/xml");

        const piezasXML = xml.querySelectorAll("pieza");

        piezasXML.forEach(piezaXML => {
            // Leemos cada dato del XML
            const pieza = {
                nombre: piezaXML.querySelector("nombre").textContent,
                tipo: piezaXML.querySelector("tipo").textContent,
                defensa: Number(piezaXML.querySelector("defensa").textContent),
                fuego: Number(piezaXML.querySelector("fuego").textContent),
                agua: Number(piezaXML.querySelector("agua").textContent),
                rayo: Number(piezaXML.querySelector("rayo").textContent),
                hielo: Number(piezaXML.querySelector("hielo").textContent),
                dragon: Number(piezaXML.querySelector("dragon").textContent),
                habilidad: piezaXML.querySelector("habilidad").textContent
            };

            // Guardamos la pieza en la lista general
            listaArmaduras.push(pieza);
        });

        // Cuando ya cargó todo el XML, llenamos la página
        mostrarTabla(listaArmaduras);
        llenarSelects();
    })
    .catch(error => {
        console.error("Error al cargar armaduras.xml:", error);
    });


// Esta función muestra las piezas en la tabla.
// Recibe una lista porque puede mostrar todas o solo las filtradas.
function mostrarTabla(armaduras) {
    tablaArmaduras.innerHTML = "";

    armaduras.forEach(pieza => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${pieza.nombre}</td>
            <td>${pieza.tipo}</td>
            <td>${pieza.defensa}</td>
            <td>${pieza.fuego}</td>
            <td>${pieza.agua}</td>
            <td>${pieza.rayo}</td>
            <td>${pieza.hielo}</td>
            <td>${pieza.dragon}</td>
            <td>${pieza.habilidad}</td>
        `;

        tablaArmaduras.appendChild(fila);
    });
}


// Esta función llena los selects del simulador.
// Cada pieza se manda al select correspondiente según su tipo.
function llenarSelects() {
    listaArmaduras.forEach((pieza, index) => {
        const opcion = document.createElement("option");

        // Usamos el index como value para poder recuperar después
        // la pieza exacta desde listaArmaduras.
        opcion.value = index;
        opcion.textContent = pieza.nombre;

        if (pieza.tipo === "Casco") {
            selectCasco.appendChild(opcion);
        } else if (pieza.tipo === "Pechera") {
            selectPechera.appendChild(opcion);
        } else if (pieza.tipo === "Guantes") {
            selectGuantes.appendChild(opcion);
        } else if (pieza.tipo === "Cintura") {
            selectCintura.appendChild(opcion);
        } else if (pieza.tipo === "Botas") {
            selectBotas.appendChild(opcion);
        }
    });
}


// Esta función filtra la tabla según lo que escribas en el input.
function filtrarArmaduras() {
    const texto = filtroArmadura.value.toLowerCase();

    const armadurasFiltradas = listaArmaduras.filter(pieza => {
        const nombre = pieza.nombre.toLowerCase();
        const tipo = pieza.tipo.toLowerCase();
        const habilidad = pieza.habilidad.toLowerCase();

        return (
            nombre.includes(texto) ||
            tipo.includes(texto) ||
            habilidad.includes(texto)
        );
    });

    mostrarTabla(armadurasFiltradas);
}


// Esta función obtiene las piezas seleccionadas y suma sus estadísticas.
function calcularSet() {
    const indicesSeleccionados = [
        selectCasco.value,
        selectPechera.value,
        selectGuantes.value,
        selectCintura.value,
        selectBotas.value
    ];

    let totalDefensa = 0;
    let totalFuego = 0;
    let totalAgua = 0;
    let totalRayo = 0;
    let totalHielo = 0;
    let totalDragon = 0;

    let habilidades = [];

    indicesSeleccionados.forEach(indice => {
        // Si el select está vacío, no hacemos nada
        if (indice === "") {
            return;
        }

        const pieza = listaArmaduras[indice];

        totalDefensa += pieza.defensa;
        totalFuego += pieza.fuego;
        totalAgua += pieza.agua;
        totalRayo += pieza.rayo;
        totalHielo += pieza.hielo;
        totalDragon += pieza.dragon;

        habilidades.push(pieza.habilidad);
    });

    // Mostramos los totales en pantalla
    defensaTotal.textContent = totalDefensa;
    resFuego.textContent = totalFuego;
    resAgua.textContent = totalAgua;
    resRayo.textContent = totalRayo;
    resHielo.textContent = totalHielo;
    resDragon.textContent = totalDragon;

    mostrarHabilidades(habilidades);
}


// Esta función muestra las habilidades seleccionadas.
// Si varias piezas tienen la misma habilidad, las cuenta.
function mostrarHabilidades(habilidades) {
    listaHabilidades.innerHTML = "";

    if (habilidades.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Ninguna pieza seleccionada";
        listaHabilidades.appendChild(li);
        return;
    }

    const contadorHabilidades = {};

    habilidades.forEach(habilidad => {
        if (contadorHabilidades[habilidad]) {
            contadorHabilidades[habilidad]++;
        } else {
            contadorHabilidades[habilidad] = 1;
        }
    });

    for (const habilidad in contadorHabilidades) {
        const li = document.createElement("li");
        li.textContent = `${habilidad} +${contadorHabilidades[habilidad]}`;
        listaHabilidades.appendChild(li);
    }
}


// Eventos del filtro
filtroArmadura.addEventListener("input", filtrarArmaduras);

// Eventos de los selects.
// Cada vez que cambias una pieza, se recalcula el set.
selectCasco.addEventListener("change", calcularSet);
selectPechera.addEventListener("change", calcularSet);
selectGuantes.addEventListener("change", calcularSet);
selectCintura.addEventListener("change", calcularSet);
selectBotas.addEventListener("change", calcularSet);