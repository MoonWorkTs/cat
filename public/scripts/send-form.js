import { alert } from "./alert.js";

export class SendForm {
  constructor(form) {
    this.form = form;
    this.validator = new JustValidate(form);
    this.sendBtn = form.querySelector(".form-body__submit");

    this.validator
      .addField("#form_surname", [
        {
          rule: "required",
          errorMessage: "Это поле должно быть заполнено",
        },
      ])
      .addField("#form_name", [
        {
          rule: "required",
          errorMessage: "Это поле должно быть заполнено",
        },
      ])
      .addField("#form_lastname", [
        {
          rule: "required",
          errorMessage: "Это поле должно быть заполнено",
        },
      ])
      .addField("#form_email", [
        {
          rule: "required",
          errorMessage: "Это поле должно быть заполнено",
        },
        {
          rule: "email",
          errorMessage: "Не корректная почта",
        },
      ])
      .addField("#form_phone", [
        {
          rule: "required",
          errorMessage: "Это поле должно быть заполнено",
        },
        {
          rule: "customRegexp",
          value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
          errorMessage: "Не корректный номер телефона",
        },
      ])
      .addField("#from_privacy", [
        {
          rule: "required",
          errorMessage: "",
        },
      ]);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const isValid = this.validate().isValid;

      if (!isValid) return;

      this.submit(Object.fromEntries(new FormData(form)));
    });
  }

  validate() {
    return this.validator.onSuccess();
  }

  async submit(data) {
    try {
      this.sendBtn.classList.add("submitting");

      const res = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error();
      }

      this.form.reset();
      alert(
        "ok",
        "Спасибо за обращение! Мы свяжемся с Вами в ближайшее время.",
      );
    } catch (error) {
      alert("err", "Произошла ошибка, попробуйте ещё раз.");
    } finally {
      this.sendBtn.classList.remove("submitting");
    }
  }
}
