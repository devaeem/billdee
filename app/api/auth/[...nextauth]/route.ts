// @typescript-eslint/no-empty-object-type
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface CustomUser {
  id: string;
  email?: string;
  access_token?: string;
  accessToken?: string;
  refresh_token?: string;
  role?: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id?: string;
      email?: string;
      role?: string;
    };
  }
  interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    id?: string;
    email?: string;
    role?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const login = await axiosInstance.post("/auth/sign-in", credentials);
          const userData = login.data.data;
          console.log("userData", userData);

          if (userData && userData.accessToken) {
            const user: CustomUser = {
              accessToken: userData.accessToken,
              id: userData.role,
              email: userData.email,
              role: userData.role,
            };
            return user;
          }
          return null;
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log("error", error.response?.data.message);
          }
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.email = user.email || "";
        token.role = user.role || "";
      }
      return token;
    },
    async session({ session, token }) {
      console.log("token", token);
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.email = token.email || "";
        session.user.role = token.role || "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
