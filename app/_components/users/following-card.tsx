"use client";

import { checkFollowReqStatus } from "@/data/followdb";
import { FollowStatus } from "@/types";
import { User } from "@prisma/client";
import AvatarProvider from "../utils/providers/avatar-provider";
import Link from "next/link";
import FollowButton from "@/app/(protected)/home/profile/follow-button";

interface FollowingCardProps {
  following: User;
  loggedInUser: User;
}

export const FollowingCard = ({
  following,
  loggedInUser,
}: FollowingCardProps) => {
  let followStatus: FollowStatus = "None";
  if (loggedInUser && following) {
    followStatus = checkFollowReqStatus(loggedInUser, following);
  }
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center transition rounded-sm cursor-pointer w-full mr-1'>
        <AvatarProvider height='10' width='10' name={following.name} />
        <Link href={`/home/users/${following.username}`} className='block ml-2'>
          <p className='text-sm font-medium text-white leading-none'>
            {following.name}
          </p>
          <p className='text-sm font-light text-muted-foregroune'>
            {following.username}
          </p>
        </Link>
      </div>
      {!(loggedInUser.id === following.id) && (
        <FollowButton
          user={following}
          loggedInUser={loggedInUser}
          followStatus={followStatus}
        />
      )}
    </div>
  );
};
