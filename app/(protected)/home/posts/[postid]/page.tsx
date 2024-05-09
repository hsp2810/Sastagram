import PostPageModal from "./post-page-modal";
import HeaderDisplay from "@/app/_components/utils/others/header-display";
import { getLikedByUsers, getPostById } from "@/data/postdb";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import CommentForm from "./comments/comment-form";
import CommentsContainer from "./comments/comments-container";
import { getCommentsByPostId } from "@/data/commentsdb";
import CaptionDisplay from "./caption-display";
import PostModalHeader from "./post-modal-header";
import { auth } from "@/auth";
import PostLike from "./likes/post-like";
import PostLikeDisplay from "./likes/post-like-display";
import { User } from "@prisma/client";
import { Icons } from "@/app/_components/utils/providers/icons";

interface PageProps {
  params: {
    postid: string;
  };
}

export default async function PostPage({ params }: PageProps) {
  const session = await auth();
  if (!session) return <HeaderDisplay title='Session Expired' />;
  const loggedInUser = session.user;

  const post = await getPostById(params.postid);
  if (!post) return <HeaderDisplay title='Post not found' />;

  const comments = await getCommentsByPostId(params.postid);

  const likedByUsers = await getLikedByUsers(post.likes);

  return (
    <PostPageModal>
      <main className='flex'>
        <section className='flex flex-[50] items-center'>
          <div className='relative w-full h-full'>
            <img
              src={post.sourceUrl}
              alt={`${(
                <span className='flex items-center justify-center'>
                  <Icons.spinner className='h-4 w-4' />
                </span>
              )}`}
              className='absolute inset-0 object-contain w-full h-full'
            />
          </div>
        </section>
        <section className='flex-[50] flex flex-col'>
          <PostModalHeader
            user={post.uploader}
            post={post}
            loggedInUser={loggedInUser}
          />
          <Separator className='text-[#262626] h-[.5px]' />
          <div className='min-h-[70%]'>
            <CaptionDisplay
              user={post.uploader}
              caption={post.caption}
              uploaded_time={post.uploadedTime}
            />
            {!comments ? (
              <h1>Failed to load comments</h1>
            ) : (
              <CommentsContainer
                comments={comments}
                commentsDisabled={post.commentsDisabled}
                post={post}
              />
            )}
          </div>
          <Separator className='text-[#262626] h-[1px]' />
          <section className='flex flex-col p-3 space-y-2'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-3'>
                <PostLike post={post} loggedInUser={loggedInUser} />
                <MessageCircle className='h-6 w-6 cursor-pointer hover:text-muted-foreground transition' />
              </div>
              <Bookmark className='h-6 w-6 cursor-pointer hover:text-muted-foreground transition' />
            </div>
            {likedByUsers && likedByUsers.length > 0 && (
              <PostLikeDisplay
                post={post}
                likedByUsers={likedByUsers}
                loggedInUser={loggedInUser}
              />
            )}
          </section>
          <Separator className='text-[#262626] h-[1px]' />
          <CommentForm
            postId={post.id}
            commentsDisabled={post.commentsDisabled}
          />
        </section>
      </main>
    </PostPageModal>
  );
}
