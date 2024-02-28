"use client";

import { actionSetUnfollowClient } from "@/actions/follow";
import { Icons } from "@/app/_components/utils/icons";
import { Button } from "@/components/ui/button";
import { FollowStatus } from "@/types";
import { User } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import UnfollowAlert from "./alert-unfollow";

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
  const [isPending, startTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [approveUnfollow, setApproveUnfollow] = useState<boolean>(false);

  const handleClick = async (e: any) => {
    e.preventDefault();
    setShowDeleteDialog(true);
  };

  useEffect(() => {
    if (approveUnfollow) {
      startTransition(() => {
        actionSetUnfollowClient(loggedInUser, otherUser);
      });
    }
  }, [showDeleteDialog]);

  return (
    <div>
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
      <UnfollowAlert
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        setApproveUnfollow={setApproveUnfollow}
        otherUser={otherUser}
      />
    </div>
  );
}
