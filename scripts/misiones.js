    const papeles = [
        "../imagenes/misiones/hoja1.png",
        "../imagenes/misiones/hoja2.png",
        "../imagenes/misiones/hoja3.png",
        "../imagenes/misiones/hoja4.png"
    ];
    const misiones = document.querySelectorAll(".mision");
    misiones.forEach(m => {
    const imagenRandom = papeles[Math.floor(Math.random() * papeles.length)];
    m.style.backgroundImage = `url(${imagenRandom})`;
});
