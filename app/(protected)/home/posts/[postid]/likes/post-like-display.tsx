"use client";

import HeaderDisplay from "@/app/_components/utils/others/header-display";
import { Post, User } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostLikeModal from "./post-like-modal";

interface PageProps {
  post: Post;
  likedByUsers: User[];
  loggedInUser: User;
}

export default function PostLikeDisplay({
  post,
  likedByUsers,
  loggedInUser,
}: PageProps) {
  return (
    <main>
      {post.likes.length > 0 && (
        <div className='flex gap-12'>
          <p className='text-sm font-light'>
            Liked by{" "}
            <Link
              className='font-medium'
              href={`/home/users/${likedByUsers[0].username}`}
            >
              {likedByUsers[0].username}
            </Link>
            {likedByUsers.length > 1 && (
              <PostLikeModal
                post={post}
                likedBy={likedByUsers}
                loggedInUser={loggedInUser}
              />
            )}
          </p>
        </div>
      )}
    </main>
  );
}
