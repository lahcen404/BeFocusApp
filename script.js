const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const priority = document.getElementById('taskPriority').value;
    const description = document.getElementById('taskDescription').value;

    const taskItem = document.createElement('li');
    taskItem.className = 'border border-gray-300 rounded p-4';
    taskItem.innerHTML = `
        <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <input type="checkbox" class="markComplete w-5 h-5">
                <div>
                    <h3 class="text-xl font-bold">${title}</h3>
                    <p class="text-sm text-gray-600">${description}</p>
                    <span class="text-xs font-medium bg-${priority === 'low' ? 'green' : priority === 'medium' ? 'yellow' : 'red'}-500 text-white px-2 py-1 rounded">${priority} Priority</span>
                </div>
            </div>
            <div class="space-x-2">
                <button class="editTask bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                <button class="deleteTask bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </div>
        </div>
    `;

    taskList.appendChild(taskItem);
    taskForm.reset();
});