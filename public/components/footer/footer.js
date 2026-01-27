import { loadHtml } from "../../scripts/load-html.js";

class Footer extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/footer/footer.html");

    this.template = html.querySelector("#footer-template");

    customElements.define("app-footer", this);
  }

  connectedCallback() {
    const clone = Footer.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

Footer.define();
