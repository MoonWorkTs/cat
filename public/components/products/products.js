import { loadHtml } from "../../scripts/load-html.js";

class Products extends HTMLElement {
  static async define() {
    const html = await loadHtml("../components/products/products.html");

    this.template = html.querySelector("#products-template");

    customElements.define("app-products", this);
  }

  connectedCallback() {
    const clone = Products.template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

class Product extends HTMLElement {
  static get observedAttributes() {
    return ["img", "title", "text", "note", "compound", "compound_note"];
  }

  static async define() {
    const html = await loadHtml("../components/products/product.html");
    this.template = html.querySelector("#product-template");
    customElements.define("app-product", this);
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
    if (!Product.template) return;
    this.innerHTML = "";
    const clone = Product.template.content.cloneNode(true);

    const compoundArr = this.getAttribute("compound").split(";");

    const list = clone.querySelector("#compound_list");
    compoundArr.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.trim();
      list.appendChild(li);
    });

    clone.querySelector("#title").textContent =
      this.getAttribute("title") || "";
    clone.querySelector("#text").innerHTML = this.getAttribute("text") || "";
    clone.querySelector("#note").querySelector("p").innerHTML =
      this.getAttribute("note") || "";
    clone.querySelector("#compound_note").querySelector("p").innerHTML =
      this.getAttribute("compound_note") || "";
    clone.querySelector("#img").src = this.getAttribute("img") || "";

    this.appendChild(clone);
  }
}

Products.define();
Product.define();
