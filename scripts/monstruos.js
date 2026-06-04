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
    const tabla = document.getElementById("tabla-monstruos");

    for (let i = 0; i < mons.length; i++) {
        const nombre = mons[i].getElementsByTagName("nombre")[0].textContent;
        const clase = mons[i].getElementsByTagName("clase")[0].textContent;
        const descripcion = mons[i].getElementsByTagName("descripcion")[0].textContent;
        const imagen = mons[i].getElementsByTagName("imagen")[0].textContent;

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <img src="${imagen}" alt="${nombre}" width="100">
            </td>
            <td>${nombre}</td>
            <td>${clase}</td>
            <td>${descripcion}</td>
        `;

        tabla.appendChild(fila);
    }
}