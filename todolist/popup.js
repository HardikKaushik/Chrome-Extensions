// popup.js
document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Load tasks from storage
  chrome.storage.sync.get('tasks', function (data) {
    const tasks = data.tasks || [];
    displayTasks(tasks);
  });

  // Add new task
  addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      chrome.storage.sync.get('tasks', function (data) {
        const tasks = data.tasks || [];
        tasks.push({ text: taskText, completed: false });
        chrome.storage.sync.set({ tasks }, function () {
          displayTasks(tasks);
          taskInput.value = '';
        });
      });
    }
  });

  // Display tasks
  function displayTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(function (task, index) {
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', function () {
        tasks[index].completed = checkbox.checked;
        if (checkbox.checked) {
          // Remove the completed task
          tasks.splice(index, 1);
        }
        chrome.storage.sync.set({ tasks }, function () {
          displayTasks(tasks);
        });
      });
      const textSpan = document.createElement('span');
      textSpan.textContent = task.text;
      listItem.appendChild(checkbox);
      listItem.appendChild(textSpan);
      
      if (task.completed) {
        listItem.classList.add('completed-task');
      }
      
      taskList.appendChild(listItem);
    });
  }
});
