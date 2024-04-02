import AvatarProvider from "@/app/_components/utils/providers/avatar-provider";
import { auth } from "@/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUsersByIds } from "@/data/userdb";
import { checkFollowReqStatus } from "@/data/followdb";
import { FollowStatus } from "@/types";
import { User } from "@prisma/client";
import Link from "next/link";
import FollowButton from "./follow-button";
import RemoveFollowerBtn from "./remove-follower-btn";

interface PageProps {
  user: User;
  followersId: string[];
  isLoggedIn: boolean;
}

export default async function FollowerModal({
  user,
  followersId,
  isLoggedIn,
}: PageProps) {
  const followers = await getUsersByIds(followersId);
  if (!followers) return <h1>Some Error Occured</h1>;

  const session = await auth();
  const loggedInUser = session?.user;
  if (!loggedInUser) return <h1>Some Error Occured</h1>;

  return (
    <Dialog>
      <DialogTrigger className='mx-2'>
        <span className='font-bold'>{followers.length}</span> followers
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='w-full'>
          <DialogTitle className='text-xl'>
            @{user.username}'s followers on Sastagram
          </DialogTitle>
          <DialogDescription>
            <section className='mt-8 flex flex-col space-y-4'>
              {followers.length === 0 ? (
                <h1>Account doesn't have any followers</h1>
              ) : (
                followers.map((follower) => {
                  return (
                    <FollowerCard
                      key={follower.id}
                      follower={follower}
                      loggedInUser={loggedInUser}
                      isLoggedIn={isLoggedIn}
                    />
                  );
                })
              )}
            </section>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

interface FollowerCardProps {
  follower: User;
  loggedInUser: User;
  isLoggedIn: boolean;
}

const FollowerCard = ({
  follower,
  loggedInUser,
  isLoggedIn,
}: FollowerCardProps) => {
  let followStatus: FollowStatus = "None";
  if (loggedInUser && follower) {
    followStatus = checkFollowReqStatus(loggedInUser, follower);
  }
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center transition rounded-sm cursor-pointer w-full mr-1'>
        <AvatarProvider height='10' width='10' />
        <Link href={`/home/users/${follower.username}`} className='block ml-2'>
          <p className='text-sm font-medium text-white leading-none'>
            {follower.name}
          </p>
          <p className='text-sm font-light text-muted-foregroune'>
            {follower.username}
          </p>
        </Link>
      </div>
      {!(loggedInUser.id === follower.id) && (
        <div className='flex gap-2'>
          <FollowButton
            user={follower}
            loggedInUser={loggedInUser}
            followStatus={followStatus}
          />
          {isLoggedIn && (
            <RemoveFollowerBtn user={follower} loggedInUser={loggedInUser} />
          )}
        </div>
      )}
    </div>
  );
};
