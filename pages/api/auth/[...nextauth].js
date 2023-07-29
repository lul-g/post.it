import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { CredentialsProvider } from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../prisma/client";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // CredentialsProvider({
    //   name: "Sign in",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "example@google.com",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials || !credentials.email || !credentials.password) {
    //       return null;
    //     }
    //     const dbUser = await prisma.user.findFirst({
    //       where: { email: credentials.email },
    //     });
    //     if (dbUser && dbUser.password == credentials.password) {
    //       const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
    //       return dbUserWithoutPassword;
    //     }
    //     return null;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};
export default NextAuth(authOptions);
