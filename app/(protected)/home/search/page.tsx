import { prisma } from "@/lib/prisma";
import SearchProvider from "./search-provider";
import { auth } from "@/auth";

export default async function SearchPage() {
  const session = await auth();
  const loggedInUser = session?.user;
  const allUsers = await prisma.user.findMany({
    where: {
      id: {
        not: loggedInUser?.id,
      },
    },
  });
  if (!allUsers) return <h1>Error</h1>;

  return <SearchProvider allUsers={allUsers} />;
}
