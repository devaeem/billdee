import axiosInstance from "@/app/utils/axios";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface CustomUser {
  id: string;
  email: string;
  access_token: string;
  accessToken: string;
  refresh_token: string;
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

          if (userData && userData.access_token) {
            const user: CustomUser = {
              access_token: userData.access_token,
              accessToken: userData.access_token,
              refresh_token: userData.refresh_token,
              id: userData.id,
              email: userData.email,
              role: userData.role,
            };
            return user;
          }
          return null;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
        token.id = user.id;
        token.email = user.email || "";
        token.role = user.role || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
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
