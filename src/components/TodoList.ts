import { TodoItem } from "./TodoItem";

export function TodoList(todos, onToggle, onDelete) {
  
  var listElement = document.createElement("ul");

  
  for (var i = 0; i < todos.length; i++) {
    var listItem = TodoItem(todos[i], i, onToggle, onDelete);
    listElement.appendChild(listItem);
  }


  return listElement;
}
