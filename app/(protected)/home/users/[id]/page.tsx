import { prisma } from "@/lib/prisma";
import UserProfile from "../../profile/user-profile";
import { User } from "@prisma/client";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: PageProps) {
  const id = params.id;
  const user: User | null = await prisma.user.findUnique({ where: { id } });

  return <UserProfile user={user} isLoggedIn={false} />;
}
