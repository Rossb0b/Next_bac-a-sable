import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "lib/db/prisma";
import bcrypt from "bcrypt";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler;

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "..@example.com" },
        password: { label: "password", type: "password" }
      },

      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (user) {
          const checkPassword = await bcrypt.compare(credentials.password, user.password);

          if(!checkPassword) {
            return;
          }

          return user;
        } else {
          return null;
        }
      }
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],

  callbacks: {
    async signIn(account) {
      let isAllowedToSignIn = true;

      if (account.provider === "google") {
        const userDB = await prisma.account.findUnique({
          where: {
            providerAccountId: account.id
          }
        });

        if (!userDB) {
          isAllowedToSignIn = false;
        }
      }

      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    }
  },

  adapter: Adapters.Prisma.Adapter({ prisma }),

  secret: process.env.SECRET,

  session: {
    jwt: true,
    maxAge: 24 * 60 * 60
  },

  jwt: {
    secret: process.env.SECRET
  },

  debug: true
}