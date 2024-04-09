import { Post } from "@prisma/client";
import Comment from "./comment";
import { IComment } from "@/types";

interface PageProps {
  comments: IComment[];
  commentsDisabled: boolean | null;
  post: Post;
}

export default function CommentsContainer({
  comments,
  commentsDisabled,
  post,
}: PageProps) {
  return (
    <main className='my-2 h-[50vh]'>
      <h1 className='ml-3'>Comments ({comments.length})</h1>
      {commentsDisabled ? (
        <h1 className='my-10 text-center font-light text-xs'>
          Comments are hidden
        </h1>
      ) : (
        <section className='grid gap-2 content-baseline my-4 overflow-y-scroll h-[48vh] shadow-lg'>
          {comments &&
            comments.length > 0 &&
            comments.map((comment) => {
              return <Comment key={comment.id} comment={comment} post={post} />;
            })}
        </section>
      )}
    </main>
  );
}
