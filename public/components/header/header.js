import { loadHtml } from "../../scripts/load-html.js";

class Header extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/header/header.html");

    this.template = html.querySelector("#header-template");

    customElements.define("app-header", this);
  }

  connectedCallback() {
    const clone = Header.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

Header.define();
