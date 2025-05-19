import "./todo-item";

export class TodoList extends HTMLElement {
  todos: { text: string; done: boolean }[] = [];

  set data(todos: { text: string; done: boolean }[]) {
    this.todos = todos;
    this.render();
  }

  render() {
    this.innerHTML = "";
    this.todos.forEach((todo, index) => {
      const item = document.createElement("todo-item");
      item.setAttribute("text", todo.text);
      item.setAttribute("done", String(todo.done));
      item.setAttribute("index", String(index));

      item.addEventListener("toggle", (e: any) => {
        this.dispatchEvent(new CustomEvent("toggle", { detail: e.detail }));
      });

      item.addEventListener("delete", (e: any) => {
        this.dispatchEvent(new CustomEvent("delete", { detail: e.detail }));
      });

      this.appendChild(item);
    });
  }
}

customElements.define("todo-list", TodoList);
