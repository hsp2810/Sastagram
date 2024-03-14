import { User } from "@prisma/client";
import PostCardPreview from "../post-card-preview";
import { prisma } from "@/lib/prisma";
import HeaderDisplay from "../../utils/others/header-display";

interface PageProps {
  loggedInUser: User;
}

export default async function PostPreviewGrid({ loggedInUser }: PageProps) {
  const posts = await prisma.post.findMany({
    where: {
      userId: loggedInUser.id,
    },
    include: {
      comments: true,
    },
  });
  if (!posts || posts.length === 0)
    return <HeaderDisplay title='No posts yet' />;

  return (
    <main className='grid grid-cols-3 gap-3'>
      {posts.map((post) => {
        return <PostCardPreview key={post.id} post={post} />;
      })}
    </main>
  );
}
