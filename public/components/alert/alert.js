import { loadHtml } from "../../scripts/load-html.js";

class Alert extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/alert/alert.html");

    this.template = html.querySelector("#alert-template");

    customElements.define("app-alert", this);
  }

  connectedCallback() {
    const clone = Alert.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

Alert.define();
