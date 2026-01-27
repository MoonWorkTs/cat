import { loadHtml } from "../../scripts/load-html.js";

class Certificates extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/certificates/certificates.html");

    this.template = html.querySelector("#certificates-template");

    customElements.define("app-certificates", this);
  }

  connectedCallback() {
    const clone = Certificates.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

Certificates.define();
