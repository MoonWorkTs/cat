export const sanitize = (str = "") => {
  return str.replace(/[<>]/g, "").trim();
};
