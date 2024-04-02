import { User } from "@prisma/client";
import PostCardPreview from "../post-card-preview";
import { prisma } from "@/lib/prisma";
import HeaderDisplay from "../../utils/others/header-display";

interface PageProps {
  user: User;
}

export default async function PostPreviewGrid({ user }: PageProps) {
  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
    include: {
      comments: true,
    },
    orderBy: {
      uploadedTime: "desc",
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
