import { auth } from "@/auth";
import { getUsersByIds } from "@/data/userdb";
import FollowRequestNotification from "./follow-request-notification";
import HomeContainer from "./home-container";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const session = await auth();
  if (!session) return <h1>Session Expired</h1>;
  const user = session?.user;
  const followRequests = await getUsersByIds(user?.follow_requests);

  return (
    <main className='flex'>
      {followRequests && followRequests.length > 0 && (
        <FollowRequestNotification followRequests={followRequests} />
      )}
      <HomeContainer loggedInUser={user} />
      <Separator orientation='vertical' />
      <div>People you might know</div>
    </main>
  );
}
