import React from "react";
import PostPageModal from "./post-page-modal";
import Image from "next/image";
import AvatarProvider from "@/app/_components/utils/providers/avatar-provider";
import Link from "next/link";
import HeaderDisplay from "@/app/_components/utils/others/header-display";
import { getPostById } from "@/data/postdb";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

interface PageProps {
  params: {
    postid: string;
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostById(params.postid);
  if (!post) return <HeaderDisplay title='Session Expired' />;

  return (
    <PostPageModal>
      <main className='flex'>
        <section className='flex-[50]'>
          <img src='/photo.jpg' alt='Photo' className='w-full' />
        </section>
        <section className='flex-[50] flex flex-col'>
          <div className='flex items-center space-x-2 p-3'>
            <AvatarProvider height='10' width='10' />
            <Link href={"/"} className='text-sm font-medium leading-none'>
              {post.uploader.username}
            </Link>
          </div>
          <Separator className='text-[#262626] h-[.5px]' />
          <div className='min-h-[70%]'>
            <div className='flex items-center space-x-2 p-3'>
              <AvatarProvider height='10' width='10' />
              <div>
                <div className='flex items-center gap-2'>
                  <Link href={"/"} className='text-sm font-medium leading-none'>
                    {post.uploader.username}
                  </Link>
                  <p className='font-light text-sm'>{post.caption}</p>
                </div>
                <p className='text-sm text-muted-foreground'>6w</p>
              </div>
            </div>
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
            <div>
              <p className='text-sm font-light'>Liked by abc14 and 30 others</p>
            </div>
          </section>
          <Separator className='text-[#262626] h-[1px]' />
          <div></div>
        </section>
      </main>
    </PostPageModal>
  );
}
