export const mobileNumberValidator = (value: string) => {
  const regex = /^[6789]\d{9}$/;
  if (regex.test(value)) {
    return true;
  } else {
    return false;
  }
};
