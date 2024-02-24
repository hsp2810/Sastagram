import { auth } from "@/auth";
import UserProfile from "./user-profile";
import { User } from "@prisma/client";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) return <h1>Session Expired</h1>;
  const user: User = session.user;

  return <UserProfile user={user} isLoggedIn={!!session.user} />;
}
