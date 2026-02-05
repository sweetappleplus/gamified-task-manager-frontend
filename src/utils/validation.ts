import { EMAIL_REGEX } from "consts";

export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);
