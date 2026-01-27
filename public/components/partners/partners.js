import { loadHtml } from "../../scripts/load-html.js";

class Partners extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/partners/partners.html");

    this.template = html.querySelector("#partners-template");

    customElements.define("app-partners", this);
  }

  connectedCallback() {
    const clone = Partners.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

Partners.define();
