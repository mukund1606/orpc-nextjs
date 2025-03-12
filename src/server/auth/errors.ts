import { CredentialsSignin } from "next-auth";

export class InvalidLoginError extends CredentialsSignin {
  code = "Invalid credentials";
}

export class UserNotFoundError extends CredentialsSignin {
  code = "User not found";
}
