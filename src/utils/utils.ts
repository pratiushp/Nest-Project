export const generateOtpCode = () => {
  const digits = '0123456789';
  let otpCode = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otpCode += digits.charAt(randomIndex);
  }

  return otpCode;
};

export const expireTime = (): Date => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);
  return expiresAt;
};
