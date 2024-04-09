"use client";

import AvatarProvider from "@/app/_components/utils/providers/avatar-provider";
import { Post, User } from "@prisma/client";
import Link from "next/link";
import PostSettingsModal from "./post-settings-modal";

interface PageProps {
  user: User;
  post: Post;
  loggedInUser: User;
}

export default function PostModalHeader({
  user,
  post,
  loggedInUser,
}: PageProps) {
  return (
    <div className='flex items-center justify-between p-3'>
      <div className='flex items-center space-x-2 '>
        <AvatarProvider height='10' width='10' name={user.name} />
        <Link href={"/"} className='text-sm font-medium leading-none'>
          {user.username}
        </Link>
      </div>
      {post.userId === loggedInUser.id && <PostSettingsModal post={post} />}
    </div>
  );
}
