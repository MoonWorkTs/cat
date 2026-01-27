export class SendForm {
  constructor(form) {
    this.form = form;
    this.validator = new JustValidate(form);

    this.validator
      .addField("#form_name", [
        {
          rule: "required",
          errorMessage: "Это поле должно быть заполнено",
        },
      ])
      .addField("#form_surname", [
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

  submit(data) {}
}
