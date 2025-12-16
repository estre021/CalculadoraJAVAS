# 📋 Tasky – Sistema de Gestión de Tareas

Tasky es una aplicación web de gestión de tareas tipo **dashboard**, inspirada en herramientas modernas de productividad como **Trello** o **Asana**. Permite a los usuarios crear, visualizar, editar, filtrar y eliminar tareas, asegurando la **persistencia de los datos en el navegador**.

---

## ✨ Funcionalidades Principales

* **CRUD Completo:** Crear, leer, actualizar y eliminar tareas (`Create`, `Read`, `Update`, `Delete`).
* **Persistencia Local:** Las tareas se almacenan en `localStorage`, con una carga inicial desde un archivo JSON. **Los datos no se pierden al recargar la página.**
* **Dashboard por Estados:**

  * `In Progress` (En progreso)
  * `Completed Task` (Completada)
  * `Over-Due` (Vencida) – calculado automáticamente según la fecha límite.
* **Gestión de Tareas:**

  * Edición de tareas mediante un modal.
  * Confirmación antes de eliminar una tarea.
* **Filtros y Ordenamiento:**

  * Filtros por `priority` y `area`.
  * Ordenamiento por prioridad (Alta → Baja).
* **Diseño Responsivo:** Interfaz optimizada para **Desktop**, **Tablet** y **Móvil** usando **Flexbox** y **Grid**.

---

## 🧱 Estructura del Proyecto

```bash
tasky/
│
├── index.html        # Estructura principal y UI del dashboard
├── style.css         # Estilos CSS (Flexbox, Grid y responsive design)
├── script.js         # Lógica de la aplicación (CRUD, DOM, filtros, persistencia)
├── tasks.json        # Datos de ejemplo y carga inicial
└── README.md         # Documentación del proyecto
```

---

## 🗂️ Estructura del JSON de Tareas

El archivo `tasks.json` y la variable `tasks` almacenada en `localStorage` utilizan la siguiente estructura de objeto. Esta estructura es clave para la persistencia y el cálculo correcto del estado de cada tarea.

| Campo         | Tipo   | Descripción                                                       | Ejemplo                  |
| ------------- | ------ | ----------------------------------------------------------------- | ------------------------ |
| `id`          | Number | Identificador único de la tarea (generalmente `Date.now()`).      | `1678886400000`          |
| `title`       | String | Título breve de la tarea.                                         | "Design Landing Page"    |
| `description` | String | Descripción completa de la tarea.                                 | "Create UI for the page" |
| `dueDate`     | String | Fecha límite (`YYYY-MM-DD`). Usada para calcular tareas vencidas. | `2025-02-20`             |
| `area`        | String | Área o materia asociada a la tarea.                               | "UX Design"              |
| `priority`    | String | Nivel de importancia (`High`, `Medium`, `Low`).                   | "High"                   |
| `status`      | String | Estado actual (`In Progress`, `Completed Task`, `Over-Due`).      | "In Progress"            |

---

## 💾 Persistencia de Datos

### Carga Inicial

* Al iniciar la aplicación por primera vez (o si `localStorage` está vacío), `script.js` carga automáticamente las tareas desde `tasks.json`.

### Persistencia

* Todos los cambios realizados (crear, editar, eliminar o cambiar estado) se guardan automáticamente en `localStorage` bajo la clave:

```js
tasky_tasks
```

### Cálculo Automático de Estado

* La función `checkTaskStatus` recalcula el estado **Over-Due** cada vez que se carga la aplicación.
* Se compara la `dueDate` con la fecha actual, garantizando que las tareas vencidas se muestren correctamente, incluso si estaban guardadas como `In Progress`.

---

## 🧪 Tecnologías Utilizadas

* **HTML5:** Estructura semántica del proyecto.
* **CSS3:** Estilos avanzados, Flexbox, Grid y diseño responsivo.
* **JavaScript Vanilla (ES6):** Lógica de negocio, manipulación del DOM y manejo de eventos.
* **JSON:** Formato de datos para carga inicial.
* **localStorage:** Persistencia de datos en el navegador.

---

## 🖥️ Cómo Ejecutar la App Localmente

Para que Tasky funcione correctamente (especialmente la carga de `tasks.json`), debe ejecutarse mediante un **servidor local**.

### Opción 1: Live Server (Recomendado – VS Code)

1. Instalar la extensión **Live Server** en VS Code.
2. Abrir la carpeta `tasky/`.
3. Clic derecho sobre `index.html`.
4. Seleccionar **Open with Live Server**.

La aplicación se abrirá automáticamente en una URL similar a:

```
http://127.0.0.1:5500/index.html
```

### Opción 2: Usando Node.js (`serve`)

1. Instalar `serve` globalmente:

```bash
npm install -g serve
```

2. Navegar a la carpeta raíz del proyecto:

```bash
cd tasky/
serve .
```

3. Abrir el navegador en:

```
http://localhost:3000
```

---

## 📌 Notas Finales

Tasky es una solución ligera, eficiente y totalmente frontend, ideal para practicar **JavaScript Vanilla**, manejo de estado con `localStorage` y diseño de dashboards responsivos.
