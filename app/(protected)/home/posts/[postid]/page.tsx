import PostPageModal from "./post-page-modal";
import HeaderDisplay from "@/app/_components/utils/others/header-display";
import { getPostById } from "@/data/postdb";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import CommentForm from "./comment-form";
import CommentsContainer from "./comments-container";
import { getCommentsByPostId } from "@/data/commentsdb";
import CaptionDisplay from "./caption-display";
import PostModalHeader from "./post-modal-header";
import { auth } from "@/auth";

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
  if (!post) return <HeaderDisplay title='Session Expired' />;

  const comments = await getCommentsByPostId(params.postid);

  return (
    <PostPageModal>
      <main className='flex'>
        <section className='flex flex-[50] items-center'>
          <div className='relative w-full h-full'>
            <img
              src={post.sourceUrl}
              alt='Photo'
              className='absolute inset-0 object-cover w-full h-full'
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
                <Heart className='h-6 w-6 cursor-pointer hover:text-muted-foreground transition' />
                <MessageCircle className='h-6 w-6 cursor-pointer hover:text-muted-foreground transition' />
              </div>
              <Bookmark className='h-6 w-6 cursor-pointer hover:text-muted-foreground transition' />
            </div>
            {post.likes.length > 0 && (
              <div className='flex gap-16'>
                <p className='text-sm font-light'>
                  Liked by abc14 and 30 others
                </p>
              </div>
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
