"use client";

import { actionSendFollowRequest } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { FollowStatus } from "@/types";
import { User } from "@prisma/client";
import React, { useTransition } from "react";
import FollowingClientBtn from "./following-client-btn";
import { Icons } from "@/app/_components/utils/icons";

interface PageProps {
  user: User;
  loggedInUser: User;
  followStatus: FollowStatus;
}

export default function FollowButton({
  user,
  loggedInUser,
  followStatus,
}: PageProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      actionSendFollowRequest(loggedInUser, user, followStatus);
    });
  };

  return (
    <div>
      {!(followStatus === "Following" && user.account_type === "PRIVATE") ? (
        <Button
          variant={"default"}
          className='w-full'
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? (
            <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <>{followStatus}</>
          )}
        </Button>
      ) : (
        <FollowingClientBtn
          followStatus={followStatus}
          loggedInUser={loggedInUser}
          otherUser={user}
        />
      )}
    </div>
  );
}
