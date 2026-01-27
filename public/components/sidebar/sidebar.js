import { loadHtml } from "../../scripts/load-html.js";

class Sidebar extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/sidebar/sidebar.html");

    this.template = html.querySelector("#sidebar-template");

    customElements.define("app-sidebar", this);
  }

  connectedCallback() {
    const clone = Sidebar.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

Sidebar.define();
