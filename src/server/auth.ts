import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // callbacks: {
  //   session({ session, user }) {
  //     // console.log("authOptions", { session, user });
  //     // if (session.user) {
  //     //   session.user.id = user.id;
  //     //   // session.user.role = user.role; <-- put other properties on the session here
  //     // }
  //     return session;
  //   },
  // },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "your@mail.com" },
        password: {
          label: "password",
          type: "password",
          placeholder: "********",
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "Your Name",
        },
        isNewUser: {
          label: "New User",
          type: "checkbox",
          placeholder: "New User",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials?.email || !credentials?.password) {
          return null;
        }

        // Registration flow
        if (credentials.isNewUser) {
          const newUser = await prisma.user.create({
            data: {
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
            },
          });

          return newUser;
        }

        // Login flow
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
            password: credentials.password,
          },
        });

        if (!user) {
          return null;
        }

        console.log({ name: user.name, id: user.id, email: user.email });

        return { name: user.name, id: user.id, email: user.email };
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
