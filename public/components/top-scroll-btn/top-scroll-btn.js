import { loadHtml } from "../../scripts/load-html.js";

class TopScrollBtn extends HTMLElement {
  static async define() {
    const html = await loadHtml(
      "../components/top-scroll-btn/top-scroll-btn.html",
    );

    this.template = html.querySelector("#top-scroll-btn-template");

    customElements.define("app-top-scroll-btn", this);
  }

  connectedCallback() {
    const clone = TopScrollBtn.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

TopScrollBtn.define();
