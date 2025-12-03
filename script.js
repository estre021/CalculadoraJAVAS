const TIEMPO_COCCION = 40;

document.getElementById("btnCalcular").addEventListener("click", function () {

    let capasPrompt = prompt("¿Cuántas capas de lasaña estás preparando?");
    let hornoPrompt = prompt("¿Cuántos minutos lleva la lasaña en el horno?");

    if (capasPrompt === null || hornoPrompt === null || capasPrompt === "" || hornoPrompt === "") {
        alert("Debe ingresar valores válidos.");
        return;
    }

    let capas = Number(capasPrompt);
    let hornoActual = Number(hornoPrompt);

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

    document.getElementById("capas").value = capas;
    document.getElementById("horno").value = hornoActual;
    document.getElementById("capas").value = "";
    document.getElementById("horno").value = "";
    document.getElementById("capas").focus();
});
