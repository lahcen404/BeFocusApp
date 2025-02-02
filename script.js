document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const toggleButton = document.getElementById('toggleButton');
    const completedTasks = document.getElementById('completedTasks');
    const errorMessage = document.getElementById('errorMessage');

    // Load tasks  localStorage
    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('taskTitle').value;
        const priority = document.getElementById('taskPriority').value;
        const description = document.getElementById('taskDescription').value;
       
        if (!title) {
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none'; 


        const taskItem = createTaskItem({ title, priority, description });
        taskList.appendChild(taskItem);
        saveTask({ title, priority, description });
        taskForm.reset();
    });

    toggleButton.addEventListener('click', function() {
        if (completedTasks.classList.contains('hidden')) {
            completedTasks.classList.remove('hidden');
            toggleButton.childNodes[0].textContent = 'HIDE TASKS ▲';
        } else {
            completedTasks.classList.add('hidden');
            toggleButton.childNodes[0].textContent = 'SHOW TASKS ▼';
        }
    });

   

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskItem(task);
            taskList.appendChild(taskItem);
        });
    }

    function createTaskItem(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'border m-4 bg-white border-gray-300 rounded p-4';
        taskItem.innerHTML = `
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="markComplete w-5 h-5">
                    <div>
                        <h3 class="text-xl font-bold">${task.title}</h3>
                        <p class="text-sm text-gray-600">${task.description}</p>
                        <span class="text-xs font-medium bg-${task.priority === 'low' ? 'green' : task.priority === 'medium' ? 'yellow' : 'red'}-500 text-white px-2 py-1 rounded">${task.priority} Priority</span>
                    </div>
                </div>
                <div class="space-x-2">
                    <button class="editTask bg-blue-500 text-white px-3 mb-2 py-1 rounded hover:bg-blue-600">Edit</button>
                    <button class="deleteTask bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </div>
            </div>
        `;

        const editButton = taskItem.querySelector('.editTask');
        const deleteButton = taskItem.querySelector('.deleteTask');

        editButton.addEventListener('click', () => {
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskDescription').value = task.description;
            taskList.removeChild(taskItem);
            removeTask(task);
        });

        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            removeTask(task);
        });

        return taskItem;
    }

    function removeTask(taskToRemove) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.title !== taskToRemove.title || task.priority !== taskToRemove.priority || task.description !== taskToRemove.description);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Pomodoro Timer
    let timerInterval;
    let timerSeconds = 1500;

    const timerDisplay = document.getElementById('timerDisplay');
    const startTimer = document.getElementById('startTimer');
    const pauseTimer = document.getElementById('pauseTimer');
    const resetTimer = document.getElementById('resetTimer');
    const shortBreak = document.getElementById('shortBreak');
    const longBreak = document.getElementById('longBreak');

    function updateTimerDisplay() {
        const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
        const seconds = (timerSeconds % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }

    startTimer.addEventListener('click', () => {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                if (timerSeconds > 0) {
                    timerSeconds--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert('Time Complete !!!!!');
                }
            }, 1000);
        }
    });

    pauseTimer.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
    });

    resetTimer.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timerSeconds = 1500;
        updateTimerDisplay();
    });

    shortBreak.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timerSeconds = 300;
        updateTimerDisplay();
    });

    longBreak.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timerSeconds = 900;
        updateTimerDisplay();
    });

    updateTimerDisplay();
});