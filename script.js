const TIEMPO_COCCION = 40;

document.getElementById("btnCalcular").addEventListener("click", function () {

    let capas = prompt("¿Cuántas capas de lasaña estás preparando?");
    let hornoActual = prompt("¿Cuántos minutos lleva la lasaña en el horno?");

    if (!capas || !hornoActual) {
        alert("Debes ingresar valores válidos.");
        return;
    }

    capas = Number(capas);
    hornoActual = Number(hornoActual);

    if (isNaN(capas) || isNaN(hornoActual) || capas < 0 || hornoActual < 0) {
        alert("Los valores no pueden ser negativos ni contener letras.");
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
});
