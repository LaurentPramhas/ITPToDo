import { todoList } from "./components/TodoList";
import bildUrl from "./img/list.jpg"; // Bild wird importiert

interface Todo {
  text: string;
  done: boolean;
}

document.addEventListener("DOMContentLoaded", function () {
  const formElement = document.getElementById("todo-form") as HTMLFormElement;
  const inputElement = document.getElementById("todo-input") as HTMLInputElement;
  const listContainer = document.getElementById("todo-list") as HTMLUListElement;
  const imageContainer = document.getElementById("image") as HTMLDivElement;

  // Bild-Element erstellen
  const imageElement = document.createElement("img");
  imageElement.src = bildUrl; // Bild-URL von Parcel verwenden
  imageElement.alt = "Beispielbild";
  imageElement.style.width = "100px"; // Bildgröße einstellen

  imageContainer.innerHTML = "<img src='" + bildUrl + "' alt='Beispielbild' style='width: 100px;'>";
  // Bild an den Anfang von <main> einfügen
  const mainElement = document.querySelector("main");
  if (mainElement !== null) {
    mainElement.insertBefore(imageElement, mainElement.firstChild);
  }

  let todos: Todo[] = [];

  const savedTodosText = localStorage.getItem("todos");
  if (savedTodosText !== null) {
    todos = JSON.parse(savedTodosText);
  }

  function render(): void {
    listContainer.innerHTML = "";

    const listElement = todoList(todos, toggleTodo, deleteTodo);
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

  formElement.onsubmit = function (event: SubmitEvent): void {
    event.preventDefault();
    const text: string = inputElement.value.trim();
    if (text !== "") {
      addTodo(text);
      inputElement.value = "";
    }
  };

  render();
});
