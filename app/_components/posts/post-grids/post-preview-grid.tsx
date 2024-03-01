import PostCardPreview from "../post-card-preview";

export default function PostPreviewGrid() {
  return (
    <main className='grid grid-cols-3 gap-3'>
      <PostCardPreview likes={30} comments={7} />
    </main>
  );
}
