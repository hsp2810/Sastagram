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
import { FollowingCard } from "@/app/_components/users/following-card";

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
        <DialogHeader className='w-full'>
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
                      following={account}
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
