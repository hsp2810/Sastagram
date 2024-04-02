"use client";

import { actionDeleteComment } from "@/actions/comments";
import { Button } from "@/components/ui/button";
import { IComment } from "@/types";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

interface PageProps {
  comment: IComment;
}

export default function DeleteCommentBtn({ comment }: PageProps) {
  const [isPending, startTransition] = useTransition();

  const handleDeleteComment = () => {
    startTransition(() => {
      actionDeleteComment(comment);
    });
  };

  return (
    <Button
      variant={"none"}
      className='p-0 h-5'
      onClick={handleDeleteComment}
      disabled={isPending}
    >
      <Trash2 className='w-4 cursor-pointer hover:text-muted-foreground transition' />
    </Button>
  );
}
