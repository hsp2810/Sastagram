"use client";

import {
  actionRemoveFollower,
  actionSendFollowRequest,
} from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { FollowStatus } from "@/types";
import { User } from "@prisma/client";
import React, { useTransition } from "react";
import FollowingClientBtn from "./following-client-btn";
import { Icons } from "@/app/_components/utils/providers/icons";

interface PageProps {
  user: User;
  loggedInUser: User;
}

export default function RemoveFollowerBtn({ user, loggedInUser }: PageProps) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(() => {
      actionRemoveFollower(loggedInUser, user);
    });
  };

  return (
    <Button
      variant={"outline"}
      className='w-full'
      onClick={handleRemove}
      disabled={isPending}
    >
      {isPending ? (
        <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <>Remove</>
      )}
    </Button>
  );
}
