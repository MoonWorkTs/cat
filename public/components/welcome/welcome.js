import { loadHtml } from "../../scripts/load-html.js";

class Welcome extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/welcome/welcome.html");

    this.template = html.querySelector("#welcome-template");

    customElements.define("app-welcome", this);
  }

  connectedCallback() {
    const clone = Welcome.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

Welcome.define();
