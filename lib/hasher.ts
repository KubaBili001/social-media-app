import CryptoJS from "crypto-js";

export function hashPassword(password: string, salt: string): string {
  const keySize = 64 / 4;
  const iterations = 1000;

  const wordArraySalt = CryptoJS.enc.Hex.parse(salt);
  const hash = CryptoJS.PBKDF2(password.normalize(), wordArraySalt, {
    keySize: keySize,
    iterations: iterations,
  });

  return hash.toString(CryptoJS.enc.Hex).normalize();
}

export function comparePasswords(
  password: string,
  salt: string,
  hashedPassword: string
): boolean {
  const inputHashedPassword = hashPassword(password, salt);
  return constantTimeEqual(inputHashedPassword, hashedPassword);
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function generateSalt(): string {
  return CryptoJS.lib.WordArray.random(16)
    .toString(CryptoJS.enc.Hex)
    .normalize();
}
