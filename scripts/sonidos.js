const sonidoHover = new Audio("../sonidos/menu2.mp3");
const sonidoClick = new Audio("../sonidos/menu1.mp3");

const botones = document.querySelectorAll("button, a, .mision");

botones.forEach(boton => {
    boton.addEventListener("mouseenter", () => {
        reproducirSonido(sonidoHover);
    });
    boton.addEventListener("click", () => {
        reproducirSonido(sonidoClick);
    });
});


function reproducirSonido(audio) {
    if (!audioActivado) {
        return;
    }

    audio.currentTime = 0;
    audio.play();
}
const enlaces = document.querySelectorAll("a");

enlaces.forEach(enlace => {
    enlace.addEventListener("click", (e) => {
        e.preventDefault();

        const destino = enlace.href;

        sonidoClick.currentTime = 0;
        sonidoClick.play();

        setTimeout(() => {
            window.location.href = destino;
        }, 400);
    });
});

