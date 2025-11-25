let nombre = prompt("¿Cuál es tu nombre?");
let nacimiento = prompt("¿En qué año naciste?");

nacimiento = Number(nacimiento);

const anioActual = 2025;

let edad = anioActual - nacimiento;

let mensaje = "Hola, " + nombre + ". Tienes " + edad + " años.";

document.getElementById("resultado").textContent = mensaje;
