import { prisma } from "@/lib/prisma";
import UserProfile from "../../profile/user-profile";
import { User } from "@prisma/client";
import { getUserByUsername } from "@/data/userdb";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function UserPage({ params }: PageProps) {
  const username = params.slug;
  const user: User | null = await getUserByUsername(username);

  return <UserProfile user={user} isLoggedIn={false} />;
}
