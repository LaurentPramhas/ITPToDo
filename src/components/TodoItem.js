export function TodoItem(todo, index, onToggle, onDelete) {

  var listItem = document.createElement("li");


  if (todo.done === true) {
    listItem.className = "done";
  } else {
    listItem.className = "";
  }


  var spanElement = document.createElement("span");
  spanElement.textContent = todo.text;
  spanElement.style.cursor = "pointer";


  spanElement.onclick = function () {
    onToggle(index);
  };


  var deleteButton = document.createElement("button");
  deleteButton.textContent = "🗑️";


  deleteButton.onclick = function () {
    onDelete(index);
  };


  listItem.appendChild(spanElement);
  listItem.appendChild(deleteButton);


  return listItem;
}
