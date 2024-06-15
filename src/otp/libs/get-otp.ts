export function getRandomOtp(length: number = 4): string {
  let otp = '';
  const possible = '123456789';
  for (let i = 0; i < length; i++) {
    const sup = Math.floor(Math.random() * possible.length);
    otp += i > 0 && sup === i ? '0' : possible.charAt(sup);
  }
  return otp;
}
