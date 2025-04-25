import { TodoList } from "./components/TodoList";

// Hole die HTML-Elemente aus der Seite
var formElement = document.getElementById("todo-form");
var inputElement = document.getElementById("todo-input");
var listContainer = document.getElementById("todo-list");

// Lade die gespeicherten Todos aus localStorage oder starte mit leerem Array
var savedTodosText = localStorage.getItem("todos");
var todos;

if (savedTodosText !== null) {
  todos = JSON.parse(savedTodosText);
} else {
  todos = [];
}

// Funktion: Zeigt die aktuelle Todo-Liste an und speichert sie im localStorage
function render() {
  
  listContainer.innerHTML = "";

  
  var listElement = TodoList(todos, toggleTodo, deleteTodo);

 
  listContainer.appendChild(listElement);

 
  var todosText = JSON.stringify(todos);
  localStorage.setItem("todos", todosText);
}


function addTodo(text) {
  var newTodo = {
    text: text,
    done: false
  };
  todos.push(newTodo);
  render();
}


function toggleTodo(index) {
  var todo = todos[index];
  if (todo.done === true) {
    todo.done = false;
  } else {
    todo.done = true;
  }
  render();
}


function deleteTodo(index) {
  todos.splice(index, 1);
  render();
}


formElement.onsubmit = function(event) {
  event.preventDefault(); 

  var text = inputElement.value.trim();

  if (text !== "") {
    addTodo(text);
    inputElement.value = ""; 
  }
};


render();


