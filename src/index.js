let tasks = [];
let currentId = 1;

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        currentId = Math.max(...tasks.map(task => task.id), 0) + 1;
        renderTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks in the table
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td class="action">
                <button class="btn btn-sm btn-secondary" onclick="editTask(${task.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskList.appendChild(row);
    });
}

// Add or update a task
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskId = document.getElementById('taskId').value;
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;

    if (taskId) {
        // Update existing task
        const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
        tasks[taskIndex] = { ...tasks[taskIndex], name: taskName, description: taskDescription };
    } else {
        // Add new task
        tasks.push({ id: currentId++, name: taskName, description: taskDescription });
    }

    saveTasks();
    renderTasks();
    taskForm.reset();
    document.getElementById('taskId').value = '';
});

// Edit a task
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    document.getElementById('taskId').value = task.id;
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDescription').value = task.description;
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Initialize the application
loadTasks();