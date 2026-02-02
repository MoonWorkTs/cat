export const normalizePhone = (phone) => {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("7") ? `+${digits}` : `+7${digits}`;
};
