import validator from "validator";

export const validateFields = (values) => {
  let error = false;
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

  if (
    (!validator.isEmail(values.email),
    !values.name || values.name.length == "" || values.name > 30,
    !values.surname || values.surname.length == "" || values.surname > 30,
    !values.lastname || values.lastname.length == "" || values.lastname > 30,
    !values.phone ||
      values.phone.length == "" ||
      phoneRegex.test(values.phone) == false,
    values.privacy !== "no" || !values.privacy)
  ) {
    error = true;
  }

  return error;
};
