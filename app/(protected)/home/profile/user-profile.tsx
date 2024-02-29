import { Separator } from "@/components/ui/separator";
import { EditDialog } from "./edit-dialog";
import PostPreviewGrid from "@/app/_components/posts/post-grids/post-preview-grid";
import { User, UserAccountType } from "@prisma/client";
import { LockKeyhole } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { checkFollowReqStatus } from "@/data/followdb";
import { auth } from "@/auth";
import FollowButton from "./follow-button";
import AvatarProvider from "@/app/_components/utils/avatar-provider";
import VerifiedBadgeProvider from "./verified-badge-provider";
import GenderAvatarProvider from "@/app/_components/utils/gender-avatar-provider";
import { FollowStatus } from "@/types";
import FollowingModal from "./following-modal";
import FollowerModal from "./follower-modal";

interface PageProps {
  user: User | null;
  isLoggedIn: boolean;
}

export default async function UserProfile({ user, isLoggedIn }: PageProps) {
  const session = await auth();
  const loggedInUser = session?.user;

  if (user && user.id === loggedInUser?.id) {
    isLoggedIn = true;
  }

  let followStatus: FollowStatus = "None";
  if (loggedInUser && user) {
    followStatus = checkFollowReqStatus(loggedInUser, user);
  }

  if (!user) return <h1>Error in loading the user</h1>;

  return (
    <main className='flex flex-col w-full m-auto'>
      <section className='flex w-full justify-center items-start my-10'>
        <div className='flex items-start space-x-5 min-w-lg'>
          <AvatarProvider height='20' width='20' />
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-5'>
              <div className='flex gap-1 items-center'>
                <UsernameProvider username={user.username} />
                {user.isVerified && <VerifiedBadgeProvider />}
              </div>
              {isLoggedIn && <EditDialog user={user} />}
            </div>
            <div className='flex items-center'>
              <div className='mr-2'>
                <span className='font-bold'>0</span> posts
              </div>
              <FollowerModal
                user={user}
                followersId={user.followers}
                isLoggedIn={isLoggedIn}
              />
              <FollowingModal user={user} followingId={user.following} />
            </div>
            <div className='flex gap-2 items-center'>
              <p className='font-bold text-2xl'>{user.name}</p>
              <GenderAvatarProvider gender={user.gender} />
              <Badge>
                <p className='text-xs font-bold'>{user.account_type} USER</p>
              </Badge>
            </div>
            <div>
              <p className='text-sm font-light'>{user.bio}</p>
            </div>
            {!isLoggedIn && (
              <FollowButton
                user={user}
                loggedInUser={loggedInUser as User}
                followStatus={followStatus}
              />
            )}
          </div>
        </div>
      </section>
      <Separator className='h-[1px] w-full m-auto' />
      <section className='flex flex-col items-center gap-5 my-5'>
        <h1 className='text-lg font-semibold'>Posts</h1>
        {!isLoggedIn && user.account_type === UserAccountType.PRIVATE ? (
          <div className='flex gap-1'>
            <LockKeyhole className='h-4 w-4' />
            <p className='text-sm font-light'>
              Account is private. Follow to see their photos and videos.
            </p>
          </div>
        ) : (
          <PostPreviewGrid />
        )}
      </section>
    </main>
  );
}

const UsernameProvider = ({ username }: { username: string | null }) => {
  return (
    <h1
      className={`text-xl font-medium leading-loose bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent`}
    >
      {!username ? "Username" : `@${username}`}
    </h1>
  );
};
