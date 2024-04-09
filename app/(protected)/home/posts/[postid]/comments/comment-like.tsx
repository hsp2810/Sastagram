"use client";

import { actionToggleLikeComment } from "@/actions/comments";
import { Icons } from "@/app/_components/utils/providers/icons";
import { IComment } from "@/types";
import { User } from "@prisma/client";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface PageProps {
  loggedInUser: User;
  comment: IComment;
}

export default function CommentLike({ loggedInUser, comment }: PageProps) {
  const [isLiked, setIsLiked] = useState<boolean>(
    comment.likes.includes(loggedInUser.id)
  );

  const toggleLike = async () => {
    await actionToggleLikeComment(comment.postId, comment.id, loggedInUser.id);
  };

  useEffect(() => {
    if (comment.likes.includes(loggedInUser.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [comment]);

  return (
    <main className='flex gap-1 items-center'>
      {isLiked ? (
        <Icons.filledHeart
          className='h-4 w-4 cursor-pointer hover:text-muted-foreground transition'
          onClick={toggleLike}
        />
      ) : (
        <Icons.outlineHeart
          className='h-4 w-4 cursor-pointer hover:text-muted-foreground transition'
          onClick={toggleLike}
        />
      )}
      <span className='text-sm font-light'>{comment.likes.length}</span>
    </main>
  );
}
