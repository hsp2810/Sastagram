import { actionSendFollowRequest } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { FollowStatus } from "@/types";
import { User } from "@prisma/client";
import React from "react";
import FollowingClientBtn from "./following-client-btn";

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
  return (
    <>
      {!(followStatus === "Following" && user.account_type === "PRIVATE") ? (
        <form action={actionSendFollowRequest}>
          <input type='hidden' name='sendTo' value={user.id} />
          <input type='hidden' name='loggedInUserId' value={loggedInUser.id} />
          <input type='hidden' name='followStatus' value={followStatus} />
          <Button variant={"default"} className='w-full'>
            {followStatus}
          </Button>
        </form>
      ) : (
        <FollowingClientBtn
          followStatus={followStatus}
          loggedInUser={loggedInUser}
          otherUser={user}
        />
      )}
    </>
  );
}
