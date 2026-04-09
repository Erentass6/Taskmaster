let tasks = [];
let completedCount = 0;
let totalCount = 0;

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const completedCountEl = document.getElementById('completedCount');
const totalCountEl = document.getElementById('totalCount');

// Enter tuşu ile görev ekle
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Lütfen bir görev yaz!');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        if (task.completed) {
            completedCount++;
        } else {
            completedCount--;
        }
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function renderTasks() {
    totalCount = tasks.length;
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty">Henüz görev yok! 🚀</li>';
    } else {
        taskList.innerHTML = tasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleTask(${task.id})">
                <span class="task-text">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️ Sil</button>
            </li>
        `).join('');
    }
    
    // İstatistikleri güncelle
    completedCountEl.textContent = `Tamamlanan: ${completedCount}`;
    totalCountEl.textContent = `Toplam: ${totalCount}`;
}

// Sayfa yüklendiğinde localStorage'dan görevleri yükle
window.onload = function() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        completedCount = tasks.filter(t => t.completed).length;
        renderTasks();
    }
};

// Her değişiklikte localStorage'a kaydet
document.addEventListener('DOMContentLoaded', function() {
    window.addTask = addTask;
    window.toggleTask = toggleTask;
    window.deleteTask = deleteTask;
});