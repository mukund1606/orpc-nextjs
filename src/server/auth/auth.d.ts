import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    sessionToken: string;
    sessionExpiryTime: Date;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
    sessionToken: string;
    expires: Date;
  }

  interface User {
    id: string;
    username: string;
    name: string;
    email: string;
  }
}
