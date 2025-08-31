const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("add-btn");
const taskList = document.getElementById("taskList");

//Add task on button click
addTaskBtn.addEventListener("click", addTask);

//Add task on Enter key press
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
function getTasks() {
  try {
    const storedList = localStorage.getItem("tasks");
    return JSON.parse(storedList) || [];
  } catch (error) {
    console.error("Error parsing:", error);
    return [];
  }
}
function saveTasks(task) {
  try {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving:", error);
  }
}

function addTask() {
  const taskText = taskInput.value.trim();

  //if empty input
  if (!taskText) return;

  const task = {
    id: Math.random(),
    text: taskText,
    completed: false,
  };

  saveTasks(task);
  addTaskToDom(task);
  //Clear input
  taskInput.value = "";
}
function addTaskToDom(task) {
  //Create list item
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.dataset.id = task.id;

  //Task text
  const span = document.createElement("span");
  span.textContent = task.text;
  span.classList.add("task-text");
  if (task.completed) {
    span.classList.add("completed");
  }

  //Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.checked = task.completed || false;

  //Actions container
  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  //Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  //Append elements
  actions.appendChild(deleteBtn);
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}
function removeStorage(id) {
  const storedList = localStorage.getItem("tasks");
  const parsedList = JSON.parse(storedList) || [];
  tasks = parsedList.filter((t) => t.id != Number(id));
  const stringifiedList = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringifiedList);
}
function updateTaskStorage(id, completed) {
  const storedList = localStorage.getItem("tasks");
  const parsedList = JSON.parse(storedList) || [];
  tasks = parsedList.map((t) => (t.id == Number(id) ? { ...t, completed } : t));
  const stringifiedList = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringifiedList);
}
// Event Delegation for checkbox & delete
taskList.addEventListener("click", function (event) {
  // Delete task
  if (event.target.classList.contains("delete-btn")) {
    const li = event.target.closest("li");
    const id = li.dataset.id;
    removeStorage(id);
    li.remove();
  }
  // Complete task
  if (event.target.classList.contains("task-checkbox")) {
    const li = event.target.closest("li");
    const id = li.dataset.id;
    const taskText = event.target.nextElementSibling;
    if (event.target.checked) {
      taskText.classList.add("completed");
      updateTaskStorage(id, true);
    } else {
      taskText.classList.remove("completed");
      updateTaskStorage(id, false);
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const storedList = localStorage.getItem("tasks");
  const tasks = JSON.parse(storedList) || [];
  tasks.forEach((task) => addTaskToDom(task));
});
