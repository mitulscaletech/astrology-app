import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        token: { label: "Token", type: "text" }
      },
      async authorize(credentials) {
        const user = JSON.parse(credentials?.token || "{}");
        if (user) return user;
        return null;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }: { token: any; user?: any; trigger?: string; session?: any }) {
      // On login
      if (user) {
        token.user = user;
      }

      // On session.update()
      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          ...session // merge updated values
        };
      }

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;
      return session;
    }
  },

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET || "development_secret"
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
