import PostCardHortizontal from "@/app/_components/posts/post-card-horizontal";
import { getPostById } from "@/data/postdb";
import { User } from "@prisma/client";
import React from "react";

interface PageProps {
  loggedInUser: User;
}

export default async function HomeContainer({ loggedInUser }: PageProps) {
  const post = await getPostById("6636748cd860e9baadc53314");
  return (
    <main className='max-w-4xl'>
      <div className='w-2/3 m-auto'>
        <h2 className='font-bold text-2xl my-5'>
          Recent Posts by your followed people
        </h2>
        <PostCardHortizontal post={post} loggedInUser={loggedInUser} />
      </div>
    </main>
  );
}
