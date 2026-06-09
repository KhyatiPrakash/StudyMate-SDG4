// =========================
// DARK MODE
// =========================

const themeBtn = document.getElementById("themeBtn");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

if (themeBtn) {
    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

    });
}


// =========================
// STUDY PLANNER
// =========================

function loadTasks() {

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task.text, task.completed);
    });

}

function createTask(taskText, completed = false) {

    let li = document.createElement("li");

    if (completed) {
        li.style.textDecoration = "line-through";
    }

    li.innerHTML = `
        ${taskText}
        <button onclick="completeTask(this)">✔</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    document.getElementById("taskList").appendChild(li);
}

function addTask() {

    let input =
        document.getElementById("taskInput");

    if (!input) return;

    let task =
        input.value.trim();

    if (task === "") {
        return;
    }

    createTask(task);

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: task,
        completed: false
    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    input.value = "";
}

function completeTask(button) {

    let li = button.parentElement;

    li.style.textDecoration = "line-through";

    let taskText =
        li.childNodes[0].textContent.trim();

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.map(task => {

        if (task.text === taskText) {
            task.completed = true;
        }

        return task;
    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function deleteTask(button) {

    let li = button.parentElement;

    let taskText =
        li.childNodes[0].textContent.trim();

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter(task =>
        task.text !== taskText
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    li.remove();
}


// =========================
// RESOURCE SEARCH
// =========================

function searchResources() {

    let input =
        document.getElementById("searchInput");

    if (!input) return;

    let filter =
        input.value.toLowerCase();

    let cards =
        document.querySelectorAll(".resource-card");

    cards.forEach(card => {

        let text =
            card.textContent.toLowerCase();

        if (text.includes(filter)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// =========================
// LOAD TASKS ON PAGE LOAD
// =========================

if (document.getElementById("taskList")) {
    loadTasks();
}