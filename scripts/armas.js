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

    const armas = xml.getElementsByTagName("arma");
    const tabla = document.getElementById("tabla-armas");

    for (let i = 0; i < armas.length; i++) {
        const nombre = armas[i].getElementsByTagName("nombre")[0].textContent;
        const descripcion = armas[i].getElementsByTagName("descripcion")[0].textContent;
        const imagen = armas[i].getElementsByTagName("imagen")[0].textContent;

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <img src="${imagen}" alt="${nombre}" width="100">
            </td>
            <td>${nombre}</td>
            <td>${descripcion}</td>
        `;

        tabla.appendChild(fila);
    }
}