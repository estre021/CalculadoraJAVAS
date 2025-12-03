
const TIEMPO_COCCION = 40;

document.getElementById("btnCalcular").addEventListener("click", function () {

    let capasInput = document.getElementById("capas");
    let hornoInput = document.getElementById("horno");

    let capas = capasInput.value;
    let hornoActual = hornoInput.value;

    if (capas === "" || hornoActual === "") {
        alert("Debe completar todos los campos.");
        return;
    }

    capas = Number(capas);
    hornoActual = Number(hornoActual);

    if (isNaN(capas) || isNaN(hornoActual) || capas < 0 || hornoActual < 0) {
        alert("Valores inválidos. No se permiten negativos ni letras.");
        return;
    }

    let tiempoRestante = TIEMPO_COCCION - hornoActual;
    let mensajeRestante = "";

    if (tiempoRestante < 0) {
        mensajeRestante = "Te excediste del tiempo de cocción.";
        tiempoRestante = 0;
    } else {
        mensajeRestante = "Tiempo restante en el horno: " + tiempoRestante + mensajeRestante + " minutos.";
    }

    let tiempoPreparacion = capas * 2;
    let tiempoTotal = hornoActual + tiempoPreparacion;

    document.getElementById("restante").textContent = mensajeRestante;
    document.getElementById("preparacion").textContent =
        "Tiempo total de preparación: " + tiempoPreparacion + " minutos.";
    document.getElementById("total").textContent =
        "Tiempo total de trabajo: " + tiempoTotal + " minutos.";

    capasInput.value = "";
    hornoInput.value = "";

    
    capasInput.focus();
});
