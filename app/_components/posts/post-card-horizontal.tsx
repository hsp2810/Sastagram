import CaptionDisplay from "@/app/(protected)/home/posts/[postid]/caption-display";
import CommentForm from "@/app/(protected)/home/posts/[postid]/comments/comment-form";
import PostLike from "@/app/(protected)/home/posts/[postid]/likes/post-like";
import PostModalHeader from "@/app/(protected)/home/posts/[postid]/post-modal-header";
import { Separator } from "@/components/ui/separator";
import { Post, User } from "@prisma/client";
import { Bookmark, MessageCircle } from "lucide-react";
import React from "react";
import { Icons } from "../utils/providers/icons";

interface PageProps {
  post: any;
  loggedInUser: User;
}

export default function PostCardHortizontal({ post, loggedInUser }: PageProps) {
  return (
    <main className='h-[85vh] overflow-y-scroll'>
      <section className='flex flex-col'>
        <PostModalHeader
          user={post.uploader}
          post={post}
          loggedInUser={loggedInUser}
        />
        <Separator className='text-[#262626] h-[.5px]' />
        <div className='min-h-[70%]'>
          <img
            src={post.sourceUrl}
            alt={`${(
              <span className='flex items-center justify-center'>
                <Icons.spinner className='h-4 w-4' />
              </span>
            )}`}
            className='w-full h-full'
          />
        </div>
        <Separator className='text-[#262626] h-[1px]' />
        <section className='flex flex-col p-3 space-y-2'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-3'>
              <PostLike post={post} loggedInUser={loggedInUser} />
              <MessageCircle className='h-6 w-6 cursor-pointer hover:text-muted-foreground transition' />
            </div>
            <p className='font-light text-sm'>{post.caption}</p>
            <Bookmark className='h-6 w-6 cursor-pointer hover:text-muted-foreground transition' />
          </div>
          {/* {likedByUsers && likedByUsers.length > 0 && (
            <PostLikeDisplay
              post={post}
              likedByUsers={likedByUsers}
              loggedInUser={loggedInUser}
            />
          )} */}
        </section>
        <Separator className='text-[#262626] h-[1px]' />
        <CommentForm
          postId={post.id}
          commentsDisabled={post.commentsDisabled}
        />
      </section>
    </main>
  );
}
