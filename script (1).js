document.addEventListener('DOMContentLoaded', () => {
    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add new task to tasks array
    tasks.push(task);

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Add task to the DOM
    addTaskToDOM(task);

    // Clear the input field
    taskInput.value = '';
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button onclick="toggleTask(${task.id})">${task.completed ? 'Unmark' : 'Mark'}</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
}

function toggleTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Clear the task list and re-render tasks
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    updatedTasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function deleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== id);

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Clear the task list and re-render tasks
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    updatedTasks.forEach(task => {
        addTaskToDOM(task);
    });
}
