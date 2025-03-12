import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export function generateOTP(otpLength = 6) {
  const DIGITS = "0123456789";
  const ALL_CHARS = DIGITS;
  let OTP = "";
  for (let i = 0; i < otpLength; i++) {
    OTP += ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
  }
  return OTP;
}

export function generateSessionToken() {
  return uuidv4();
}

export function saltPassword(text: string) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return { hash, salt };
}

export function comparePassword(text: string, hash: string) {
  return bcrypt.compareSync(text, hash);
}
