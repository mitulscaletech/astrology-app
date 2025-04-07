import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export type Role = "user" | "astrologer" | "admin";

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role?: Role;
  accessToken?: string;
  provider?: string;
}
