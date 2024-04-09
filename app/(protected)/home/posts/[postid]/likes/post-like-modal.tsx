"use client";

import { FollowingCard } from "@/app/_components/users/following-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Post, User } from "@prisma/client";

interface PageProps {
  post: Post;
  likedBy: User[];
  loggedInUser: User;
}

export default function PostLikeModal({
  post,
  likedBy,
  loggedInUser,
}: PageProps) {
  return (
    <Dialog>
      <DialogTrigger className='ml-1 '>
        and{" "}
        <span
          className='font-medium'
          title='View all the users who liked this post'
        >
          {post.likes.length - 1} others
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='w-full'>
          <DialogTitle className='text-xl'>
            People that liked this post.
          </DialogTitle>
          <p className='font-light text-xs'>
            People who have liked your post first will appear on the top
          </p>
          <DialogDescription>
            <section className='mt-8 flex flex-col space-y-4'>
              {likedBy.length === 0 ? (
                <h1>This post does not have any likes</h1>
              ) : (
                likedBy.map((user) => {
                  return (
                    <FollowingCard
                      key={user.id}
                      following={user}
                      loggedInUser={loggedInUser}
                    />
                  );
                })
              )}
            </section>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
