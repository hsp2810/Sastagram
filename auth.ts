import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { Gender, Role, UserAccountType } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      username: string | null;
      email: string | null;
      image: string | null;
      bio: string | null;
      emailVerified: Date | null;
      name: string | null;
      password: string | null;
      role: Role | null;
      account_type: UserAccountType | null;
      gender: Gender | null;
      followers: string[] | [];
      following: string[] | [];
      follow_requests: string[] | [];
      isVerified: boolean | null;
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/",
    error: "/auth-error",
  },

  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      //Allow OAuth without email verification
      if (account && account.provider !== "credentials") return true;

      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });
      if (existingUser && !existingUser.emailVerified) return false;

      // TODO: ADD 2FA check

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user && token.role) {
        session.user.id = token.sub;
        session.user.role = token.role as Role;
        session.user.account_type = token.account_type as UserAccountType;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.user.password = token.password as string;
        session.user.bio = token.bio as string;
        session.user.gender = token.gender as Gender;
        session.user.followers = token.followers as string[];
        session.user.following = token.following as string[];
        session.user.emailVerified = token.emailVerified as Date;
        session.user.follow_requests = token.follow_requests as string[];
        session.user.isVerified = token.isVerified as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });
      if (!existingUser) return token;
      token.role = existingUser.role;
      token.account_type = existingUser.account_type;
      token.username = existingUser.username;
      token.password = existingUser.password;
      token.bio = existingUser.bio;
      token.name = existingUser.name;
      token.gender = existingUser.gender;
      token.following = existingUser.following;
      token.followers = existingUser.followers;
      token.emailVerified = existingUser.emailVerified;
      token.follow_requests = existingUser.follow_requests;
      token.isVerified = existingUser.isVerified;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
