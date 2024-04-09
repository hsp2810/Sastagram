"use client";

import AvatarProvider from "@/app/_components/utils/providers/avatar-provider";
import { parseDateTime } from "@/lib/date";
import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface PageProps {
  user: User;
  caption: string | null;
  uploaded_time: Date | null;
}

export default function CaptionDisplay({
  user,
  caption,
  uploaded_time,
}: PageProps) {
  return (
    <div className='flex items-center space-x-2 px-3 py-5'>
      <AvatarProvider height='10' width='10' name={user.name} />
      <div>
        <div className='flex items-center gap-2'>
          <Link
            href={`/home/users/${user.username}`}
            className='text-sm font-medium leading-none'
          >
            {user.username}
          </Link>
          <p className='font-light text-sm'>{caption}</p>
        </div>
        <p className='text-xs font-light text-muted-foreground'>
          {parseDateTime(uploaded_time)}
        </p>
      </div>
    </div>
  );
}
