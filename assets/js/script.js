// inputs
let taskInput = document.getElementById("task_input");
let btn = document.getElementById("btn");
let tasks = document.querySelector(".tasks");
let errors = document.querySelector(".errors");
let header_msg = document.getElementById("header_msg");
let error_msg = document.getElementById("error_msg");
let loader = document.querySelector('#load');

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
    errors.classList.add("d-none");
    taskInput.value = "";
  } else if(result.message == "error"){
    errors.classList.remove("d-none");
    error_msg.innerText="You Must Enter Task to save it"
  }
}



// get all todos from api
async function getAllTodos() {
    tasks.classList.add("d-none");
    loader.classList.remove("d-none");
  var data = await fetch(
    "https://todos.routemisr.com/api/v1/todos/6764ac6160a208ee1fde73cd"
  );
  var result = await data.json();
  console.log();
  if (result.message === "success") {
    header_msg.innerHTML = "All Tasks"
    displayTodos(result);
    tasks.classList.remove("d-none");
    loader.classList.add("d-none");
  }
  
  if(result.todos.length === 0){
    header_msg.innerHTML = "No Tasks"
  }
}
//display all at the beg
getAllTodos();

// display all todo in html
function displayTodos(result) {
  var allTasks = ``;
  for (var i = 0; i < result.todos.length; i++) {
    allTasks += `
             <div class="task ${result.todos[i].completed?'bg-danger': ''} d-flex justify-content-between w-75  rounded-2 px-3 py-2 m-auto my-3">
                <div class="${result.todos[i].completed ?'text-decoration-line-through': ''}">${result.todos[i].title}</div>
                <div>
                    <i onclick="markCompleted('${result.todos[i]._id}')" class="fa-regular fa-circle-check mx-3 ${result.todos[i].completed?'d-none': ''}"></i>
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

    var result = await data.json();
    if(result.message === 'success'){
        getAllTodos();
    }
}


// mark as complete function
async function markCompleted(id){
    var data = await fetch("https://todos.routemisr.com/api/v1/todos",{
        method:'put',
        body:JSON.stringify({todoId: id}),
        headers:{'content-type': 'application/json'}
    });

    var result = await data.json();
    if(result.message === 'success'){
        getAllTodos();
    }
}