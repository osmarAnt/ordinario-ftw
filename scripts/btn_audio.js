let audioActivado = true;

const btnAudio = document.getElementById("btn-audio");

btnAudio.addEventListener("click", () => {
    audioActivado = !audioActivado;
    if (audioActivado) {
        btnAudio.textContent = "🔊";
    } else {
        btnAudio.textContent = "🔇";
    }
});