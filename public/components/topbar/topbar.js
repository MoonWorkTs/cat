import { loadHtml } from "../../scripts/load-html.js";

class Topbar extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/topbar/topbar.html");

    this.template = html.querySelector("#topbar-template");

    customElements.define("app-topbar", this);
  }

  connectedCallback() {
    const clone = Topbar.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

Topbar.define();
