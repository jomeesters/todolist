//Fetches the array of tasks from the database.
const getTaskData = async function() {
    try {
        const response = await fetch ("http://localhost:3000/", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        const taskData = await response.json();
        return taskData;

    } catch (error) {
        console.log(error);
    }
};


//Updates if the task is done or not in the database.
const updateTaskData = async function(id, isTaskDone) {
    try {
        const data = {done: isTaskDone};
        const response = await fetch("http://localhost:3000/" + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        });

        const parsedData = await response.json();
        return parsedData;

    } catch (error) {
        console.log(error);
    }
};



//Updates the description in the database when the text is changed.
const updateTaskDescription = async function(id, data) {
    try {
        const response = await fetch("http://localhost:3000/" + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        });

        const parsedData = await response.json();
        return parsedData;

    } catch (error) {
        console.log(error);
    }
};



//Deletes an item from the database.
const deleteTaskData = function(id) {
    try {
        fetch("http://localhost:3000/" + id, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    });

    } catch (error) {
        console.log(error)
    }
};



//Creates a new task in the database.
const postTaskData = async function(taskData) {
    try {
        const response = await fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify(taskData),
            headers: {
                "Content-type": "application/json"
            }
        });
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
};