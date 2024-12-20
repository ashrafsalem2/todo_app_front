// inputs
let taskInput = document.getElementById("task_input");
let btn = document.getElementById("btn");
let tasks = document.querySelector(".tasks");

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
  var data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "post",
    body: JSON.stringify(task),
    headers: { "content-type": "application/json" },
  });

  var result = await data.json();

  if (result.message == "success") {
    getAllTodos();
  }
}

// get all todos from api
async function getAllTodos() {
  var data = await fetch(
    "https://todos.routemisr.com/api/v1/todos/6764ac6160a208ee1fde73cd"
  );
  var result = await data.json();

  if (result.message === "success") {
    displayTodos(result);
  }
}
//display all at the beg
getAllTodos();

// display all todo in html
function displayTodos(result) {
  var allTasks = ``;
  for (var i = 0; i < result.todos.length; i++) {
    allTasks += `
             <div class="task d-flex justify-content-between w-75  rounded-2 px-3 py-2 m-auto my-3">
                <div>${result.todos[i].title}</div>
                <div>
                    <i class="fa-regular fa-circle-check mx-3"></i>
                    <i onclick="deleteTask('${result.todos[i]._id}')" class="fa-solid fa-trash"></i>
                </div>
            </div>
        `;
  }
  tasks.innerHTML = allTasks;
}


// delete function
async function deleteTask(id){
    var data = await fetch("https://todos.routemisr.com/api/v1/todos",{
        method:'delete',
        body:JSON.stringify({todoId: id}),
        headers:{'content-type': 'application/json'}
    });

    var result = data.json();
    if(result.message === 'success'){
        getAllTodos();
    }
}