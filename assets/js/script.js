// inputs
let taskInput = document.getElementById("task_input");
let btn = document.getElementById("btn");

// get the value from input throw click the btn
btn.addEventListener("click", function () {
  // console.log(taskInput.value);
  var task = {
    title: taskInput.value,
    apiKey: "6764ac6160a208ee1fde73cd",
  };
  addTodoTask(task);
});

// add new todo element from todo api
// first get the public key : "apiKey": "6764ac6160a208ee1fde73cd"
async function addTodoTask(task) {
  var data = await fetch('https://todos.routemisr.com/api/v1/todos', {
    method: "post",
    body: JSON.stringify(task),
    headers: { "content-type": "application/json" },
  });

  var result = await data.json();
  console.log(result);
}
