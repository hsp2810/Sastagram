"use client";

import { actionAddComment } from "@/actions/comments";
import FormError from "@/app/_components/auth/form-error";
import EmojiProvider from "@/app/_components/utils/others/emoji-provider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState, useTransition } from "react";

interface PageProps {
  postId: string;
  commentsDisabled: boolean | null;
}

export default function CommentForm({ postId, commentsDisabled }: PageProps) {
  const [comment, setComment] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    startTransition(() => {
      actionAddComment(postId, comment).then((data) => {
        setComment("");
        if (data) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <>
      <FormError message={error} />
      {commentsDisabled ? (
        <h1 className='my-10 text-center font-light text-sm'>
          Comments have been disabled on this post
        </h1>
      ) : (
        <div className='flex my-5 gap-3 w-full items-start px-3'>
          <EmojiProvider setComment={setComment} comment={comment} />
          <form className='flex gap-2 w-full' onSubmit={handleSubmit}>
            <Textarea
              placeholder='Add a comment...'
              className='border-none focus-visible:ring-0 rounded-none w-full resize-none p-0'
              value={comment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setComment(e.target.value)
              }
            />
            <Button disabled={comment.length < 1 || isPending}>Post</Button>
          </form>
        </div>
      )}
    </>
  );
}
