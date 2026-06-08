document.addEventListener("DOMContentLoaded", () => {
    const formPalico = document.getElementById("form-palico");

    const nombrePalico = document.getElementById("nombre-palico");
    const tipoApoyo = document.getElementById("tipo-apoyo");
    const confianzaPalico = document.getElementById("confianza-palico");
    const valorConfianza = document.getElementById("valor-confianza");
    const descripcionPalico = document.getElementById("descripcion-palico");

    const resultadoPalico = document.getElementById("resultado-palico");

    if (!formPalico) {
        console.error("No se encontró el formulario con id form-palico");
        return;
    }

    console.log("palicos.js cargado correctamente");

    confianzaPalico.addEventListener("input", () => {
        valorConfianza.textContent = confianzaPalico.value;
    });

    formPalico.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log("Botón generar ficha presionado");

        const nombre = nombrePalico.value.trim();
        const descripcion = descripcionPalico.value.trim();

        if (nombre === "") {
            resultadoPalico.innerHTML = `
                <p>Primero escribe un nombre para tu Palico.</p>
            `;
            return;
        }

        if (tipoApoyo.value === "") {
            resultadoPalico.innerHTML = `
                <p>Selecciona un tipo de apoyo para tu Palico.</p>
            `;
            return;
        }

        const pelajeSeleccionado = document.querySelector('input[name="pelaje"]:checked').value;

        const habilidadesSeleccionadas = [];

        document.querySelectorAll(".habilidad-palico:checked").forEach(habilidad => {
            habilidadesSeleccionadas.push(habilidad.value);
        });

        let textoHabilidades = "";

        if (habilidadesSeleccionadas.length === 0) {
            textoHabilidades = "<li>Sin habilidades seleccionadas</li>";
        } else {
            habilidadesSeleccionadas.forEach(habilidad => {
                textoHabilidades += `<li>${habilidad}</li>`;
            });
        }

        resultadoPalico.innerHTML = `
            <h3>${nombre}</h3>

            <p><strong>Tipo de apoyo:</strong> ${tipoApoyo.value}</p>
            <p><strong>Color de pelaje:</strong> ${pelajeSeleccionado}</p>
            <p><strong>Nivel de confianza:</strong> ${confianzaPalico.value}/10</p>

            <p><strong>Habilidades:</strong></p>
            <ul>
                ${textoHabilidades}
            </ul>

            <p><strong>Descripción:</strong> ${descripcion || "Sin descripción."}</p>
        `;
    });
});