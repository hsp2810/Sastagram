"use client";

import { actionToggleLikePost } from "@/actions/posts";
import { Icons } from "@/app/_components/utils/providers/icons";
import { Post, User } from "@prisma/client";
import { useEffect, useState } from "react";

interface PageProps {
  post: Post;
  loggedInUser: User;
}

export default function PostLike({ post, loggedInUser }: PageProps) {
  const [isLiked, setIsLiked] = useState<boolean>(
    post.likes.includes(loggedInUser.id)
  );

  const toggleLike = async () => {
    await actionToggleLikePost(post, loggedInUser.id);
  };

  useEffect(() => {
    if (post.likes.includes(loggedInUser.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post]);

  return (
    <main>
      {isLiked ? (
        <Icons.filledHeart
          className='h-6 w-6 cursor-pointer hover:text-muted-foreground transition'
          onClick={toggleLike}
        />
      ) : (
        <Icons.outlineHeart
          className='h-6 w-6 cursor-pointer hover:text-muted-foreground transition'
          onClick={toggleLike}
        />
      )}
    </main>
  );
}
