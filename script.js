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

function addTask() {
  const taskText = taskInput.value;

  //if empty input
  if (taskText === "") return;

  //Create list item
  const li = document.createElement("li");
  li.classList.add("task-item");

  //Task text
  const span = document.createElement("span");
  span.textContent = taskText;
  span.classList.add("task-text");

  //Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

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

  //Clear input
  taskInput.value = "";
}
// Event Delegation for checkbox & delete
taskList.addEventListener("click", function (event) {
  // Delete task
  if (event.target.classList.contains("delete-btn")) {
    let el = event.target;
    while (el.tagName !== "LI") {
      el = el.parentElement;
    }
    el.remove();
  }
  // Complete task
  if (event.target.classList.contains("task-checkbox")) {
    const taskText = event.target.nextElementSibling;
    if (event.target.checked) {
      taskText.classList.add("completed");
    } else {
      taskText.classList.remove("completed");
    }
  }
});
