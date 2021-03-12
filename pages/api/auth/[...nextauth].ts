import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/db/prisma";
import bcrypt from "bcrypt";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler;

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        firstName: { label: "Firstname", type: "text", placeholder: "John"},
        lastName: { label: "Lastname", type: "text", placeholder: "Doe" },
        email: { label: "Email", type: "email", placeholder: "..@example.com" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        let user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        }) || undefined;

        if (user) {
          const checkPassword = await bcrypt.compare(credentials.password, user.password);

          if(!checkPassword) {
            return;
          }
        }

        if (!user) {
          const encryptedPassword = await bcrypt.hash(credentials.password, 10);

          user = await prisma.user.create({
            data: {
              name: `${credentials.firstName} ${credentials.lastName}`,
              email: credentials.email,
              password: encryptedPassword,
              image: null
            }
          })
        }

        return user;
      }
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],

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