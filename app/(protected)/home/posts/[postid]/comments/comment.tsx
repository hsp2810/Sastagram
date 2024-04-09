import AvatarProvider from "@/app/_components/utils/providers/avatar-provider";
import Link from "next/link";
import CommentLike from "./comment-like";
import { auth } from "@/auth";
import HeaderDisplay from "@/app/_components/utils/others/header-display";
import { IComment } from "@/types";
import { Pin, Trash2 } from "lucide-react";
import DeleteCommentBtn from "./delete-comment-btn";
import { Post } from "@prisma/client";
import PinCommentBtn from "./pin-comment-btn";
import { Icons } from "@/app/_components/utils/providers/icons";
import { parseDateTime } from "@/lib/date";

interface PageProps {
  comment: IComment;
  post: Post;
}

export default async function Comment({ comment, post }: PageProps) {
  const session = await auth();
  if (!session) <HeaderDisplay title='Session Expired' />;

  const loggedInUser = session?.user;
  if (!loggedInUser) return <HeaderDisplay title='Session Expired' />;

  return (
    <div className='flex items-start space-x-2 px-3 py-2'>
      <AvatarProvider height='10' width='10' name={comment.commentBy.name} />
      <div className='w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-1'>
            <div className='flex gap-2 items-center'>
              <Link
                href={`/home/users/${comment.commentBy.username}`}
                className='text-sm font-medium leading-none'
              >
                {comment.commentBy.username}
              </Link>
              <span className='text-xs text-muted-foreground'>
                {parseDateTime(comment.uploadedTime)}
              </span>
              {comment.isPinned && (
                <span className='text-xs text-muted-foreground'>Pinned</span>
              )}
              {comment.likes.includes(post.userId) && (
                <div className='flex items-center gap-1'>
                  <Icons.filledHeart className='h-3 w-3 cursor-pointer hover:text-muted-foreground transition' />
                  <span className='text-xs text-muted-foreground'>
                    by author
                  </span>
                </div>
              )}
              {comment.userId === post.userId && (
                <div className='flex items-center gap-1'>
                  <span className='text-xs text-muted-foreground'>Author</span>
                </div>
              )}
            </div>
            <p className='font-light text-sm'>{comment.content}</p>
          </div>

          <div className='flex gap-3 items-start justify-between mr-2'>
            <CommentLike loggedInUser={loggedInUser} comment={comment} />

            {(loggedInUser.id === comment.commentBy.id ||
              loggedInUser.id === post.userId) && (
              <DeleteCommentBtn comment={comment} />
            )}

            {loggedInUser.id === post.userId && (
              <PinCommentBtn comment={comment} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
