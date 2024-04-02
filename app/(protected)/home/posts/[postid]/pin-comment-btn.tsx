"use client";

import { actionTogglePinComment } from "@/actions/comments";
import { Button } from "@/components/ui/button";
import { IComment } from "@/types";
import { Pin, PinOff } from "lucide-react";
import React from "react";
import { useTransition } from "react";

interface PageProps {
  comment: IComment;
}

export default function PinCommentBtn({ comment }: PageProps) {
  const [isPending, startTransition] = useTransition();

  const handlePinComment = () => {
    startTransition(() => {
      actionTogglePinComment(comment, comment.isPinned);
    });
  };
  return (
    <Button
      variant={"none"}
      className='p-0 h-5'
      onClick={handlePinComment}
      disabled={isPending}
    >
      {comment.isPinned ? (
        <PinOff className='h-4 w-4 cursor-pointer hover:text-muted-foreground transition mt-[3px]' />
      ) : (
        <Pin className='h-4 w-4 cursor-pointer hover:text-muted-foreground transition mt-[3px]' />
      )}
    </Button>
  );
}
