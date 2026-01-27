import { loadHtml } from "../../scripts/load-html.js";

class Form extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/form/form.html");

    this.template = html.querySelector("#form-template");

    customElements.define("app-form", this);
  }

  connectedCallback() {
    const clone = Form.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

Form.define();
