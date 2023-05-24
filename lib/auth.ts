import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "./db";
import type { AuthOptions } from "next-auth";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          !credentials ||
          !credentials?.email.trim() ||
          !credentials?.password.trim()
        ) {
          throw new Error("Please enter your credentials");
        }
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isValid = await comparePassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
