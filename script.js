const TASK_STORAGE_KEY = 'tasky_tasks';
let tasks = [];
let filteredTasks = [];
let isPreviewActive = true;

const inProgressList = document.getElementById('in-progress-list');
const completedList = document.getElementById('completed-list');
const overdueList = document.getElementById('overdue-list');

const taskModal = document.getElementById('task-modal');
const form = document.getElementById('task-form');
const taskIdInput = document.getElementById('task-id');
const modalTitle = document.getElementById('modal-title');
const detailModal = document.getElementById('detail-modal'); 
const filterModal = document.getElementById('filter-modal'); 

const openModalBtn = document.getElementById('open-modal-btn');
const closeTaskModalBtn = document.querySelector('.task-close-btn');
const closeDetailModalBtn = document.querySelector('.detail-close-btn');
const closeFilterModalBtn = document.querySelector('.filter-close-btn');

const previewButton = document.getElementById('preview-button');
const filterModalBtn = document.getElementById('filter-modal-btn');
const sortButton = document.getElementById('sort-button');

const filterForm = document.getElementById('filter-form');
const filterPrioritySelect = document.getElementById('filter-priority');
const filterAreaSelect = document.getElementById('filter-area');
const applyFilterBtn = document.getElementById('apply-filter-btn');
const clearFilterBtn = document.getElementById('clear-filter-btn');



function getFormattedDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });
}

function checkTaskStatus(task) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);


    if (task.status === 'Completed Task') {
        return task.status;
    }

    if (task.dueDate) {
       
        const dueDate = new Date(task.dueDate + 'T00:00:00');
        
       
        if (dueDate < today) {
            return 'Over-Due';
        }
    }
    
    
    return task.status;
}
function loadTasks() {
    const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    } else {
        
        tasks = [
            { id: Date.now() + 1, title: "User Flow", description: "Designing a dashboard involves of creating a visual Interface that has to be intuitive and effective, focusing on the user journey and interaction.", dueDate: '2025-12-25', area: 'UX Design', priority: 'High', status: 'In Progress' },
            { id: Date.now() + 2, title: "Website Design", description: "Designing a Website involves of creating a visual Interface that is appealing and functional, adhering to brand guidelines and responsiveness standards across all devices.", dueDate: '2025-12-20', area: 'Development', priority: 'Medium', status: 'Over-Due' },
            { id: Date.now() + 3, title: "Database Schema", description: "Finalize the PostgreSQL schema for the backend service, ensuring proper indexing and relationships for scalability and query efficiency.", dueDate: '2025-12-15', area: 'Development', priority: 'Low', status: 'Completed Task' }
        ];
    }
    filteredTasks = [...tasks]; // Inicialmente, la lista filtrada es igual a la lista completa
    renderTasks();
}

function saveTasks() {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
}
   

function updateTaskStatus(id, newStatus) {
    const taskIndex = tasks.findIndex(task => task.id == id);
    if (taskIndex !== -1) {
        tasks[taskIndex].status = newStatus;

       
        if (newStatus === 'In Progress') {
             tasks[taskIndex].status = checkTaskStatus(tasks[taskIndex]);
        }
        
        saveTasks();
        applyFilters(); 
    }
}
function deleteTask(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        tasks = tasks.filter(task => task.id != id);
        applyFilters(); 
        saveTasks();
    }
}

function populateFilterAreas() {
    const areas = [...new Set(tasks.map(task => task.area))].filter(area => area); 
    filterAreaSelect.innerHTML = '<option value="">Todas las Áreas</option>';
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        filterAreaSelect.appendChild(option);
    });
}

function applyFilters() {
    const priorityFilter = filterPrioritySelect.value;
    const areaFilter = filterAreaSelect.value;

    filteredTasks = tasks.filter(task => {
        const matchesPriority = !priorityFilter || task.priority === priorityFilter;
        const matchesArea = !areaFilter || task.area === areaFilter;
        return matchesPriority && matchesArea;
    });

    renderTasks();
    closeModal(filterModal);
}

function clearFilters() {
    filterForm.reset();
    filteredTasks = [...tasks];
    renderTasks();
    closeModal(filterModal);
}

sortButton.addEventListener('click', () => {
    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
    
    filteredTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    
    saveTasks();
    renderTasks();
    alert('Tareas ordenadas por Prioridad (Alta a Baja).');
});

function showTaskDetail(task) {
    document.getElementById('detail-title').textContent = task.title;
    document.getElementById('detail-priority').textContent = task.priority;
    document.getElementById('detail-area').textContent = task.area;
    document.getElementById('detail-dueDate').textContent = getFormattedDate(task.dueDate);
    document.getElementById('detail-status').textContent = task.status;
    document.getElementById('detail-description').textContent = task.description;
    
    openModal(detailModal);
}

previewButton.addEventListener('click', () => {
    isPreviewActive = !isPreviewActive;
    
    const allCards = document.querySelectorAll('.task-card');
    allCards.forEach(card => {
        card.classList.toggle('preview-hidden', !isPreviewActive);
    });
    
    previewButton.innerHTML = isPreviewActive 
        ? '<span class="material-symbols-rounded">visibility</span> Preview'
        : '<span class="material-symbols-rounded">visibility_off</span> Preview';
});

function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = `task-card priority-${task.priority} ${isPreviewActive ? '' : 'preview-hidden'}`; 

    const limit = 70;
    const shortDescription = task.description.substring(0, limit);
    const requiresVerMas = task.description.length > limit;

    let statusButtonHTML = '';
    let buttonClass = '';
    let buttonText = '';
    let newStatus = '';
    
    if (task.status === 'Completed Task') {
        buttonClass = 'status-action move-progress';
        buttonText = 'Mover a Progreso';
        newStatus = 'In Progress';
    } else {
        // Para 'In Progress' y 'Over-Due'
        buttonClass = 'status-action mark-complete';
        buttonText = 'Completar';
        newStatus = 'Completed Task';
    }

    statusButtonHTML = `<span class="material-symbols-rounded action-icon ${buttonClass}" data-id="${task.id}" data-status="${newStatus}" title="${buttonText}">${newStatus === 'Completed Task' ? 'task_alt' : 'rotate_left'}</span>`;


    card.setAttribute('data-id', task.id);
    card.innerHTML = `
        <div class="card-top-info">
            <span class="tag tag-priority-${task.priority}">${task.priority}</span>
            <span class="tag tag-time">${getFormattedDate(task.dueDate)}</span>
            <span class="tag tag-area">${task.area}</span>
            <span class="material-symbols-rounded more-icon">more_vert</span>
        </div>
        <h4 class="task-title">${task.title}</h4>
        <p class="task-description">${shortDescription}${requiresVerMas ? '...' : ''}</p>
        
        <div class="card-actions">
            <div class="user-avatars-group">
                <div class="avatar-sm"></div>
                <div class="avatar-sm"></div>
                <span class="plus-count">+2</span>
            </div>
            ${statusButtonHTML}
            ${requiresVerMas ? `<span class="material-symbols-rounded action-icon view-more-btn" data-id="${task.id}" title="Ver Más Detalles">visibility</span>` : ''}
            <span class="material-symbols-rounded action-icon delete-btn" data-id="${task.id}" title="Eliminar Tarea">delete</span>
            <span class="material-symbols-rounded action-icon edit-btn" data-id="${task.id}" title="Editar Tarea">edit</span>
        </div>
    `;
    
    card.querySelector('.edit-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openTaskModal(task.id);
    });
    
    card.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id);
    });

    const viewMoreBtn = card.querySelector('.view-more-btn');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showTaskDetail(task);
        });
    }
    const statusActionBtn = card.querySelector('.status-action');
    if (statusActionBtn) {
        statusActionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const taskId = e.currentTarget.getAttribute('data-id');
            const newStatus = e.currentTarget.getAttribute('data-status');
            updateTaskStatus(taskId, newStatus);
        });
    }


    return card;
}

function renderTasks() {
    inProgressList.innerHTML = '';
    completedList.innerHTML = '';
    overdueList.innerHTML = '';

    let inProgressCount = 0;
    let completedCount = 0;
    let overdueCount = 0;

    filteredTasks.forEach(task => { 
        const card = createTaskCard(task);
        if (task.status === 'In Progress') {
            inProgressList.appendChild(card);
            inProgressCount++;
        } else if (task.status === 'Completed Task') {
            completedList.appendChild(card);
            completedCount++;
        } else if (task.status === 'Over-Due') {
            overdueList.appendChild(card);
            overdueCount++;
        }
    });

    document.getElementById('in-progress-count').textContent = inProgressCount;
    document.getElementById('completed-count').textContent = completedCount;
    document.getElementById('overdue-count').textContent = overdueCount;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let taskData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        dueDate: document.getElementById('dueDate').value,
        area: document.getElementById('area').value,
        priority: document.getElementById('priority').value,
        status: document.getElementById('status').value,
    };

    const taskId = taskIdInput.value;

    if (taskId) {
        const index = tasks.findIndex(t => t.id == taskId);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...taskData };
        }
    } else {
        taskData.id = Date.now();
        tasks.push(taskData);
    }
     
    if (!taskId) {
        taskData.status = checkTaskStatus(taskData);
    } else {
        const index = tasks.findIndex(t => t.id == taskId);
        if (index !== -1) {
             tasks[index].status = checkTaskStatus(tasks[index]);
        }
    }


    saveTasks();
    applyFilters();
    closeModal(taskModal);
});

function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

function openTaskModal(id = null) {
    form.reset();
    taskIdInput.value = '';

    if (id) {
        modalTitle.textContent = 'Editar Tarea';
        const task = tasks.find(t => t.id == id);
        if (task) {
            taskIdInput.value = task.id;
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description;
            document.getElementById('dueDate').value = task.dueDate;
            document.getElementById('area').value = task.area;
            document.getElementById('priority').value = task.priority;
            document.getElementById('status').value = task.status;
        }
    } else {
        modalTitle.textContent = 'Registrar Nueva Tarea';
    }

    openModal(taskModal);
}

openModalBtn.addEventListener('click', () => openTaskModal());
closeTaskModalBtn.addEventListener('click', () => closeModal(taskModal));
closeDetailModalBtn.addEventListener('click', () => closeModal(detailModal));

filterModalBtn.addEventListener('click', () => {
    populateFilterAreas(); 
    openModal(filterModal);
});
closeFilterModalBtn.addEventListener('click', () => closeModal(filterModal));
applyFilterBtn.addEventListener('click', applyFilters);
clearFilterBtn.addEventListener('click', clearFilters);

window.onclick = function(event) {
    if (event.target == taskModal) {
        closeModal(taskModal);
    }
    if (event.target == detailModal) {
        closeModal(detailModal);
    }
    if (event.target == filterModal) {
        closeModal(filterModal);
    }
}
     

document.addEventListener('DOMContentLoaded', loadTasks);