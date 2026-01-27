import { loadHtml } from "../../scripts/load-html.js";

class Container extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/container/container.html");

    this.template = html.querySelector("#container-template");

    customElements.define("app-container", this);
  }

  connectedCallback() {
    const clone = Container.template.content.cloneNode(true);
    const wrapper = clone.querySelector(".container");

    while (this.firstChild) {
      wrapper.appendChild(this.firstChild);
    }

    this.appendChild(wrapper);
  }
}

Container.define();
