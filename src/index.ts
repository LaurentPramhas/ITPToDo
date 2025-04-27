import { TodoList } from "./components/TodoList";


interface Todo {
  text: string;
  done: boolean;
}


const formElement = document.getElementById("todo-form") as HTMLFormElement;
const inputElement = document.getElementById("todo-input") as HTMLInputElement;
const listContainer = document.getElementById("todo-list") as HTMLUListElement;


let todos: Todo[] = [];

const savedTodosText = localStorage.getItem("todos");

if (savedTodosText !== null) {
  todos = JSON.parse(savedTodosText);
}


function render(): void {
  listContainer.innerHTML = "";

  const listElement = TodoList(todos, toggleTodo, deleteTodo);
  listContainer.appendChild(listElement);

  localStorage.setItem("todos", JSON.stringify(todos));
}


function addTodo(text: string): void {
  const newTodo: Todo = {
    text: text,
    done: false
  };
  todos.push(newTodo);
  render();
}


function toggleTodo(index: number): void {
  todos[index].done = !todos[index].done;
  render();
}


function deleteTodo(index: number): void {
  todos.splice(index, 1);
  render();
}


formElement.onsubmit = function(event: SubmitEvent): void {
  event.preventDefault();
  const text: string = inputElement.value.trim();
  if (text !== "") {
    addTodo(text);
    inputElement.value = "";
  }
};


render();
