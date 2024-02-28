"use client";

import { actionHandleFollowRequest } from "@/actions/follow";
import AvatarProvider from "@/app/_components/utils/avatar-provider";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import Link from "next/link";
import { useTransition } from "react";

interface PageProps {
  follower: User;
  loggedInUser: User;
}

export default function FollowRequestCard({
  follower,
  loggedInUser,
}: PageProps) {
  const [isPending, startTransition] = useTransition();

  const handleActionFollowRequest = async (action: "confirm" | "delete") => {
    startTransition(() => {
      actionHandleFollowRequest(loggedInUser, follower, action).then((data) => {
        if (data) {
          console.log(data);
        }
      });
    });
  };

  return (
    <main>
      <div className='flex items-center justify-between'>
        <div className='flex items-center transition rounded-sm cursor-pointer w-full mr-1'>
          <AvatarProvider height='10' width='10' />
          <Link href={`/home/users/${follower.id}`} className='block ml-2'>
            <p className='inline text-md font-light text-white leading-none'>
              {follower.username}
            </p>{" "}
            <span className='text-md font-extralight'>
              requested to follow you
            </span>
            <span className='block text-md text-muted-foregroune'>4d</span>
          </Link>
        </div>
        {/* {!(loggedInUser.id === follower.id) && (
          <FollowButton
            user={follower}
            loggedInUser={loggedInUser}
            followStatus={followStatus}
          />
        )} */}
        <div className='flex gap-2'>
          <Button
            onClick={() => handleActionFollowRequest("confirm")}
            disabled={isPending}
          >
            Confirm
          </Button>
          <Button
            variant={"outline"}
            onClick={() => handleActionFollowRequest("delete")}
            disabled={isPending}
          >
            Delete
          </Button>
        </div>
      </div>
    </main>
  );
}
