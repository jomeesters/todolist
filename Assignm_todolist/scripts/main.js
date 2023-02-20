//Displays the fetched tasks in the DOM.
const displayTasks = async function() {
    try {
        const taskData = await getTaskData();

        taskData.forEach((task) => {
            createTaskElement(task);
        });

        setEventListeners();

    } catch (error) {
        console.log(error);
    }
}



//Creates a list-item for a task and sets the correct values in the DOM.
const createTaskElement = function(task) {
    const taskList = document.getElementById("task-list");

    const newLi = document.createElement("li");
    newLi.id = task._id;

    const newParagraph = document.createElement("p");
    newParagraph.innerText = task.description;
    newParagraph.setAttribute("ContentEditable", true);

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = task.done;
    if (newCheckbox.checked === true) {
        newParagraph.style.textDecoration = "line-through";
    } else {
        newParagraph.style.textDecoration = "none";
    }

    const newDeleteButton = document.createElement("button");
    newDeleteButton.classList.add("fa-solid", "fa-trash-can");
    newDeleteButton.ariaLabel = "delete task";

    taskList.appendChild(newLi);
    newLi.appendChild(newCheckbox);
    newLi.appendChild(newParagraph);
    newLi.appendChild(newDeleteButton);
};



//Adds event listeners to every button/checkbox in the task-list as soon as the DOM has loaded in.
const setEventListeners = function() {
    const deleteButtons = document.getElementById("task-list").getElementsByTagName("button");
    Array.from(deleteButtons).forEach((button) => {
        button.addEventListener("click", deleteTaskElement);
    });

    const checkboxInputs = document.getElementById("task-list").getElementsByTagName("input");
    Array.from(checkboxInputs).forEach((checkbox) => {
        checkbox.addEventListener("change", changeTaskCheckbox);
    });

    const paragraphInputs = document.getElementById("task-list").getElementsByTagName("p");
    Array.from(paragraphInputs).forEach((paragraph) => {
        paragraph.addEventListener("keyup", changeTaskDescription);
    });
};



//Changes style + database on checkbox change.
const changeTaskCheckbox = function(e) {
    const selectedParagraph = e.target.nextElementSibling;
    const selectedListItemId = e.target.parentElement.id;
    const isTaskDone = e.target.checked;

    if (e.target.checked === true) {
        selectedParagraph.style.textDecoration = "line-through";
    } else {
        selectedParagraph.style.textDecoration = "none";
    }

    updateTaskData(selectedListItemId, isTaskDone);
};



//Changes the description in the database when the text is changed.
const changeTaskDescription = function(e) {
    const selectedListItemId = e.target.parentElement.id;
    const changedDescription = {description: e.target.textContent};

    updateTaskDescription(selectedListItemId, changedDescription);
};



//Removes the list-item from the DOM on button-click.
const deleteTaskElement = function(e) {
    const selectedListItem = e.target.parentElement;
    selectedListItem.parentNode.removeChild(selectedListItem);
    
    deleteTaskData(selectedListItem.id);
};



//Creates a new list-item on clicking the 'add' button.
const addNewTask = async function() {
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    if (taskInput.value == "") {
        alert("This can't be empty");
    } else { 
        const newLi = document.createElement("li");

        const newParagraph = document.createElement("p");
        newParagraph.innerText = taskInput.value;
        newParagraph.setAttribute("ContentEditable", true);

        const newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        
        const newDeleteButton = document.createElement("button");
        newDeleteButton.classList.add("fa-solid", "fa-trash-can");
        newDeleteButton.ariaLabel = "delete task";

        taskList.appendChild(newLi);
        newLi.appendChild(newCheckbox);
        newLi.appendChild(newParagraph);
        newLi.appendChild(newDeleteButton);

        taskInput.value = "";
        const taskData = {description: newParagraph.textContent, done: newCheckbox.checked};

        const taskArray = await postTaskData(taskData);
        newLi.id = taskArray._id;
        newParagraph.innerText = taskArray.description;
        newCheckbox.checked = taskArray.done;

        setEventListeners();
    };
};



//Event listener for add new task button.
const addTaskButton = document.getElementById("button-submit");
addTaskButton.addEventListener("click", addNewTask);



//Makes the list display items from database on page-load.
window.addEventListener("load", displayTasks);