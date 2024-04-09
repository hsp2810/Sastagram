"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PostPageModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className='fixed top-0 left-0 w-full py-10 h-full flex justify-center items-center bg-black bg-opacity-80'>
      <div className='bg-[#0d0d0d] w-[80%] shadow-2xl'>
        <button
          className='absolute top-5 right-5 text-xl cursor-pointer'
          onClick={() => router.back()}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
