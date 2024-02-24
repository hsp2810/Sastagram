"use client";

import { actionSetUnfollowClient } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { FollowStatus } from "@/types";
import { User } from "@prisma/client";

interface PageProps {
  loggedInUser: User;
  otherUser: User;
  followStatus: FollowStatus;
}

export default function FollowingClientBtn({
  loggedInUser,
  otherUser,
  followStatus,
}: PageProps) {
  const handleClick = async (e: any) => {
    e.preventDefault();
    const response = window.confirm(
      "If you change your mind, you will have to request to follow //username again."
    );

    if (!response) return;

    await actionSetUnfollowClient(loggedInUser, otherUser);
  };

  return (
    <Button variant={"default"} className='w-full' onClick={handleClick}>
      {followStatus}
    </Button>
  );
}
