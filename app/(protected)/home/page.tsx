import { auth } from "@/auth";
import { getUsersByIds } from "@/data/userdb";
import FollowRequestNotification from "./follow-request-notification";

export default async function Home() {
  const session = await auth();
  if (!session) return <h1>Session Expired</h1>;
  const user = session?.user;
  const followRequests = await getUsersByIds(user?.follow_requests);

  return (
    <main>
      {followRequests && followRequests.length > 0 && (
        <FollowRequestNotification followRequests={followRequests} />
      )}
      Home
    </main>
  );
}
