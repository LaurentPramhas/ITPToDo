export class TodoItem extends HTMLElement {
    static get observedAttributes() {
      return ["text", "done", "index"];
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
    }
  
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (oldValue !== newValue) {
        this.render(); 
      }
    }
  
    render() {
      const text = this.getAttribute("text") || "";
      const done = this.getAttribute("done") === "true";
      const index = this.getAttribute("index");
  
      this.shadowRoot!.innerHTML = `
        <style>
          li {
            background: white;
            margin-bottom: 0.5rem;
            padding: 0.5rem;
            display: flex;
            justify-content: space-between;
            border-left: 5px solid transparent;
            cursor: pointer;
          }
          li.done {
            text-decoration: line-through;
            color: gray;
            border-left-color: green;
          }
          button {
            padding: 0.2rem 0.5rem;
          }
        </style>
        <li class="${done ? "done" : ""}">
          <span>${text}</span>
          <button>🗑️</button>
        </li>
      `;
  
      const span = this.shadowRoot!.querySelector("span")!;
      const button = this.shadowRoot!.querySelector("button")!;
  
      span.onclick = () => {
        this.dispatchEvent(
          new CustomEvent("toggle", { bubbles: true, detail: { index: Number(index) } })
        );
      };
  
      button.onclick = () => {
        this.dispatchEvent(
          new CustomEvent("delete", { bubbles: true, detail: { index: Number(index) } })
        );
      };
    }
  }
  
  customElements.define("todo-item", TodoItem);
  