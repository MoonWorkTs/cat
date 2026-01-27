import { loadHtml } from "../../scripts/load-html.js";

class About extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/about/about.html");

    this.template = html.querySelector("#about-template");

    customElements.define("app-about", this);
  }

  connectedCallback() {
    const clone = About.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

class AboutCard extends HTMLElement {
  static get observedAttributes() {
    return ["img", "title", "text"];
  }

  static async define() {
    const html = await loadHtml("../components/about/about-card.html");
    this.template = html.querySelector("#about-card-template");
    customElements.define("app-about-card", this);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    if (!AboutCard.template) return;
    this.innerHTML = "";
    const clone = AboutCard.template.content.cloneNode(true);

    clone.querySelector("#title").textContent =
      this.getAttribute("title") || "";
    clone.querySelector("#text").textContent = this.getAttribute("text") || "";
    clone.querySelector("#img").src = this.getAttribute("img") || "";

    this.appendChild(clone);
  }
}

About.define();
AboutCard.define();
