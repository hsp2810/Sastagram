import { auth } from "@/auth";
import FollowRequestCard from "./follow-request-card";
import { prisma } from "@/lib/prisma";

export default async function NotificationsPage() {
  const session = await auth();
  const loggedInUser = session?.user;
  if (!loggedInUser) return <h1>Session Expired</h1>;

  const followRequestsIds = loggedInUser.follow_requests;

  const followRequests = await prisma.user.findMany({
    where: {
      id: {
        in: followRequestsIds,
      },
    },
  });
  if (!followRequests) return <h1>Error</h1>;

  return (
    <main className='w-1/2 m-auto rounded-md mt-5 p-5 min-h-[90vh]'>
      <h1 className='text-3xl font-bold mb-10'>Notifications</h1>
      <section className='flex flex-col space-y-4'>
        {followRequests.length === 0 ? (
          <h1>No new notifications</h1>
        ) : (
          followRequests.map((request) => {
            return (
              <FollowRequestCard
                key={request.id}
                follower={request}
                loggedInUser={loggedInUser}
              />
            );
          })
        )}
      </section>
    </main>
  );
}
