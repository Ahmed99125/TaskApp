// Define ui elements
const form = document.querySelector('form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const cleanBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// Load ListItems
loadTasks(taskList);

// Submit Event
form.addEventListener('submit', function(e) {
    if (taskInput.value == '') {
        alert('Add your task.');
    } else {
        saveTask(taskInput);
        createTask(taskList, taskInput);
        taskInput.value = '';
        e.preventDefault();
    }
});

// Save task
function saveTask(taskInput){

    // Create date arr
    let tasks;

    // Check the localStorage and Sitting the arr
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    // Save the new task
    tasks.push(taskInput.value);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


function createTask(taskList, taskInput) {
    // Create Element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
}

function loadTasks(taskList) {
    // Define task array
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    // Looping throw tasks
    if (tasks != null) {
        for (let i = 0; i < tasks.length; i++) {
            // Create Element
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(tasks[i]));
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';
            li.appendChild(link);
            taskList.appendChild(li);
        }
    }
}

// Clear Button
cleanBtn.addEventListener('click', function() {
    localStorage.removeItem('tasks');
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
});

// Delete Link
taskList.addEventListener('click', function(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            const li = e.target.parentElement.parentElement;
            const tasks = JSON.parse(localStorage.getItem('tasks'));

            for (let i = 0; i < tasks.length; i++) {

                if (tasks[i] == li.childNodes[0].textContent) {
                    tasks.splice(i, 1);
                    break;
                }
            }

            localStorage.setItem('tasks', JSON.stringify(tasks));

            li.remove();
        }
    }
});

// Filter Tasks
filter.addEventListener('keyup', function(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    }); 
});