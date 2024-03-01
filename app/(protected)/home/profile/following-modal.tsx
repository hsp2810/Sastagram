import AvatarProvider from "@/app/_components/utils/providers/avatar-provider";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
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

interface PageProps {
  user: User;
  followingId: string[];
}

export default async function FollowingModal({ user, followingId }: PageProps) {
  const followingAccounts = await getUsersByIds(followingId);
  if (!followingAccounts) return <h1>Some Error Occured</h1>;

  const session = await auth();
  const loggedInUser = session?.user;
  if (!loggedInUser) return <h1>Some Error Occured</h1>;

  return (
    <Dialog>
      <DialogTrigger className='mx-2'>
        <span className='font-bold'>{followingAccounts.length}</span> following
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl'>
            @{user.username} follows this accounts on Sastagram
          </DialogTitle>
          <DialogDescription>
            <section className='mt-8 flex flex-col space-y-4'>
              {followingAccounts.length === 0 ? (
                <h1>There are no accounts that this user follows</h1>
              ) : (
                followingAccounts.map((account) => {
                  return (
                    <FollowingCard
                      key={account.id}
                      follower={account}
                      loggedInUser={loggedInUser}
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
}

const FollowingCard = ({ follower, loggedInUser }: FollowerCardProps) => {
  let followStatus: FollowStatus = "None";
  if (loggedInUser && follower) {
    followStatus = checkFollowReqStatus(loggedInUser, follower);
  }
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center transition rounded-sm cursor-pointer w-full mr-1'>
        <AvatarProvider height='10' width='10' />
        <Link href={`/home/users/${follower.id}`} className='block ml-2'>
          <p className='text-sm font-medium text-white leading-none'>
            {follower.name}
          </p>
          <p className='text-sm font-light text-muted-foregroune'>
            {follower.username}
          </p>
        </Link>
      </div>
      {!(loggedInUser.id === follower.id) && (
        <FollowButton
          user={follower}
          loggedInUser={loggedInUser}
          followStatus={followStatus}
        />
      )}
    </div>
  );
};
