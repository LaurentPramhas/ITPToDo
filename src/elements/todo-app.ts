import "./todo-list";

export class TodoApp extends HTMLElement {
  todos: { text: string; done: boolean }[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const saved = localStorage.getItem("todos");
    this.todos = saved ? JSON.parse(saved) : [];

    this.shadowRoot!.innerHTML = `
      <style>
        @import url('./style.css');
      </style>
      <main>
        <h1>📝 Meine To-do Liste</h1>
        <form id="todo-form">
          <input type="text" id="todo-input" placeholder="Neue Aufgabe..." required />
          <button type="submit">Hinzufügen</button>
        </form>
        <todo-list></todo-list>
        <div id="image"></div>
      </main>
    `;

    const form = this.shadowRoot!.querySelector("#todo-form") as HTMLFormElement;
    const input = this.shadowRoot!.querySelector("#todo-input") as HTMLInputElement;
    const list = this.shadowRoot!.querySelector("todo-list") as any;
    const image = this.shadowRoot!.querySelector("#image")!;

    const img = document.createElement("img");
    img.src = new URL("../img/list.jpg", import.meta.url).href;
    img.alt = "Beispielbild";
    img.style.width = "100px";
    image.appendChild(img);

    list.data = this.todos;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text) {
        this.todos.push({ text, done: false });
        input.value = "";
        this.saveAndRender();
      }
    });

    list.addEventListener("toggle", (e: any) => {
      const index = e.detail.index;
      this.todos[index].done = !this.todos[index].done;
      this.saveAndRender();
    });

    list.addEventListener("delete", (e: any) => {
      const index = e.detail.index;
      this.todos.splice(index, 1);
      this.saveAndRender();
    });
  }

  saveAndRender() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
    const list = this.shadowRoot!.querySelector("todo-list") as any;
    list.data = this.todos;
  }
}

customElements.define("todo-app", TodoApp);
