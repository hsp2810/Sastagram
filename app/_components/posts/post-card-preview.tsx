"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";

interface PageProps {
  likes: number;
  comments: number;
}

const PostCardPreview = ({ likes, comments }: PageProps) => {
  const [isHovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  return (
    <Link href={""} className='relative h-full w-full'>
      <div
        className={`transition-transform h-full w-full`}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <Image
          src={"/post-image.jpg"}
          height={300}
          width={300}
          alt=''
          className='w-[300px] h-[300px] object-cover rounded-sm'
        />
        {isHovered && (
          <div
            style={{ background: "rgba(0, 0, 0, 0.7" }}
            className='absolute z-10 inset-0 h-full w-full flex items-center justify-center gap-7'
          >
            <p className='text-pink-300 flex flex-col items-center'>
              <Heart />
              <span>{likes}</span>
            </p>
            <p className='text-green-300 flex flex-col items-center'>
              <MessageCircle />
              <span>{comments}</span>
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PostCardPreview;
