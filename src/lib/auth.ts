import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from 'next-auth/providers/auth0';

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email!),
      });

      if (!dbUser) {
        throw new Error("no user with email found");
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          image: token.picture,
        };
      }

      return session;
    },
  },
} satisfies AuthOptions;

export function getSession() {
  return getServerSession(authConfig);
}
