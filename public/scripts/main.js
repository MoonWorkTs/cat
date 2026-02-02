import "./import-components.js";
import { SendForm } from "./send-form.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Дожидаемся регистрации веб-компонентов
  await customElements.whenDefined("app-header");
  await customElements.whenDefined("app-welcome");
  await customElements.whenDefined("app-about");
  await customElements.whenDefined("app-products");
  await customElements.whenDefined("app-product");
  await customElements.whenDefined("app-form");
  await customElements.whenDefined("app-certificates");
  await customElements.whenDefined("app-footer");
  await customElements.whenDefined("app-sidebar");
  await customElements.whenDefined("app-top-scroll-btn");
  await customElements.whenDefined("app-alert");

  // Инициализация необходимых элементов
  const sections = document.querySelectorAll("section[id]");
  const navBtns = document.querySelectorAll("[data-target]");
  const readMoreProductBtn = document.getElementById("read-more-product-btn");
  // const readMoreCertBtn = document.getElementById("read-more-certificates-btn");
  const burgerNavBtn = document.querySelector(".header-burger");
  const burgerSidebarBtn = document.querySelector(".sidebar-burger");
  const sidebarBg = document.querySelector(".sidebar-bg");
  const topScrollBtn = document.querySelector(".top-scroll-btn");
  const appForm = document.querySelector("app-form");

  requestAnimationFrame(() => {
    const form = appForm.querySelector("form");
    new SendForm(form);
  });

  // Работа с медиа-запросами
  const mql1120 = window.matchMedia("(max-width: 1120px)");
  // const mql1080 = window.matchMedia("(max-width: 1080px)");
  const mql980 = window.matchMedia("(max-width: 980px)");

  mql1120.addEventListener("change", (e) => {
    !e.matches ? removeProductProp() : null;
  });

  // mql1080.addEventListener("change", (e) => {
  //   !e.matches ? removeCertProp() : null;
  // });

  mql980.addEventListener("change", (e) => {
    !e.matches ? removeSidebarProp() : null;
  });

  // Удаление свойств сайдбара
  function removeSidebarProp() {
    document.body.classList.remove("hidden");
    document.querySelector(".sidebar").classList.remove("open");
  }

  // Удаление свойств сертификатов
  // function removeCertProp() {
  //   document.querySelector(".certificates-container").style.height = null;
  //   document.querySelector(".certificates-container").classList.remove("open");
  //   readMoreCertBtn.classList.remove("open");
  // }

  // Удаление свойств продукта
  function removeProductProp() {
    document.querySelector(".product-text").style.height = null;
    document
      .querySelector(".product-text")
      .querySelector("p")
      .classList.remove("open");
    readMoreProductBtn.classList.remove("open");
  }

  // Открытие/закрытие текста продукта
  function toggleReadMoreProductText(e) {
    e.preventDefault();

    const text = document.querySelector(".product-text");
    let textFullHeight = text.querySelector("p").scrollHeight;
    let noteFullHeight = text.querySelector("#note").scrollHeight;
    let fullHeight = textFullHeight + noteFullHeight + 15;

    if (readMoreProductBtn.classList.contains("open")) {
      fullHeight = 105;
    }

    text.style.height = `${fullHeight}px`;
    text.classList.toggle("open");
    readMoreProductBtn.classList.toggle("open");
  }

  // Открытие/закрытие сертификатов
  function toggleReadMoreCert(e) {
    e.preventDefault();

    const certListContainer = document.querySelector(".certificates-container");
    let fullHeight =
      certListContainer.querySelector(".certificates-list").scrollHeight;

    if (readMoreCertBtn.classList.contains("open")) {
      fullHeight = 300;
    }

    certListContainer.style.height = `${fullHeight}px`;
    certListContainer.classList.toggle("open");
    readMoreCertBtn.classList.toggle("open");
  }

  // Функция для получения текущей видимой высоты шапки
  function getHeaderHeight() {
    const header = document.querySelector(".header-stiky");
    return header ? header.getBoundingClientRect().height : 0;
  }

  // Плавный скролл к секции
  function scrollToTarget(e) {
    e.preventDefault();
    const id = e.target.dataset.target;
    const target = document.getElementById(id);
    if (!target) return;

    const headerHeight = getHeaderHeight();
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    removeSidebarProp();

    window.scrollTo({
      top: targetPosition - headerHeight,
      behavior: "smooth",
    });
  }

  // Открытие/закрытие сайдбара
  function toggleSidebar() {
    if (document.body.classList.contains("hidden")) {
      document.body.classList.remove("hidden");
    } else {
      document.body.classList.add("hidden");
    }

    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("open");
  }

  // Плавный скролл к началу страницы
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Навешиваем события
  readMoreProductBtn.addEventListener("click", toggleReadMoreProductText);
  // readMoreCertBtn.addEventListener("click", toggleReadMoreCert);
  burgerNavBtn.addEventListener("click", toggleSidebar);
  burgerSidebarBtn.addEventListener("click", toggleSidebar);
  sidebarBg.addEventListener("click", toggleSidebar);
  topScrollBtn.addEventListener("click", scrollToTop);

  // Сброс активной кнопки при скролле вверх и скрытие кнопки сколла в начало страницы
  window.addEventListener("scroll", () => {
    if (window.scrollY < 50) {
      navBtns.forEach((btn) => btn.classList.remove("active"));
    }

    if (window.scrollY < 100) {
      topScrollBtn.classList.add("hidden");
    } else {
      topScrollBtn.classList.remove("hidden");
    }
  });

  // Навешиваем скролл на кнопки
  navBtns.forEach((btn) => {
    btn.addEventListener("click", scrollToTarget);
  });

  // IntersectionObserver для подсветки активной кнопки
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navBtns.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.target === id);
          });
        }
      });
    },
    {
      root: null,
      threshold: 0.5,
      rootMargin: "-50px 0px 0px 0px", // небольшой запас для sticky header
    },
  );

  sections.forEach((section) => observer.observe(section));

  new IMask(document.querySelector("input[name='phone']"), {
    mask: "+{7} (000) 000-00-00",
  });
});
