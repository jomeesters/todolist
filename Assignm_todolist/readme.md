Final Assignment: Todo List

You are going to build a TODO list in Vanilla JavaScript!

You will link the Todo list to a RESTful API that we have already built. So you are not going to store any of the data in the front-end of the application. You will get all the data from the "back-end" where you get your own endpoint.

Information about the database:
Read this carefully.

Clone our REST API repository so that it is on your own computer.
Follow the installation instructions in the README of the repository.
Read the documentation in the README of the repository to find out how to use this local API.
Send a GET request to the URL with Postman and check this
Write a piece of code to send the same GET request and console.log the result so that you also see the empty array there (think of async/await!).
To get the first item in your endpoint you can send a POST request to the URL, do this first with Postman and then also from JavaScript. Send as the body a JavaScript object with a description and a "done" key that is set to "false". See this example:
const data = {description: "buy oatmeal", done: false};
fetch(baseUrl, {
method: "POST",
body: JSON.stringify(data),
headers: {
"Content-Type": "application/json",
},
});
Check with GET what is in the endpoint.
You will find that the endpoint works with hashes that it generates itself from your data every time you make a request. Your data will look like this:
{
"\_id": "skdjfhskdjfhsdfk",
"description": "buy oat milk",
"done": false,
"\_createdOn": "2020-10-20et etc"
}
As you can see, you will receive an id of the endpoint for free, which you will need later to refer to that specific task.
Requirements:
As a user, I want to see an input field in which I can enter my task.
As a user, I can press a button with the text "Add Task" so that your completed task is added to the list.
As a user, when I clicked the add button, I see the task appear in my task list.
Delete task: As a user, I can click in the task list on an icon of a trash can, to the right of the task, which removes the task from my task list.
note: there are a lot of examples of TODO-list apps with Vanilla JavaScript on the internet ⇒ Copying code one-to-one from a website or from a fellow student is not the intention.

API requirements:
GET: Get the (initial) list of tasks from the database.
POST: Update the task list with 1 new task. Send only {description: "blah", done: false}
DELETE: Delete a task from the database. Use the id you get back as an identifier.
Create a file called api-client.js as you have learned lately for all your requests.
Extra Bonus:
Additional requirements:

Cross out a task: As a user, I can click on a checkbox in the task list, to the left of the task, which crosses the text of the task.
As a user, I want to be able to click on my task and change the text.
Additional API requirements (related to the above):

PUT: update an existing task the property done or not done.
PUT: update an existing task with the PUT method.
Design:
Also this week: styling is not important. Don't spend a lot of time styling! Focus on functionalities first and then on styling (we'll be styling next week, no worries).

Tips
In this project, you will add event listeners to HTML elements added by Javascript. If you want to link the event listener before the element is added, this fails. This requires a different approach! Make sure you don't assign your event listeners until last, or do this: https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
You don't need any scripts, no authentication, and nothing extra to call the API. fetch is your friend!
fetch can do more than just fetch data; it can also send and update data. Check this documentation on how to do that: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
A method like getElementsByClassName returns an HtmlCollection. This looks like an array in your console, but it's not! You can convert this to an array and then loop over it.
