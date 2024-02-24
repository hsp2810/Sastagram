"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarProvider() {
  return (
    <Avatar className='w-40 h-40'>
      <AvatarImage src='/avatars/01.png' />
      <AvatarFallback>OM</AvatarFallback>
    </Avatar>
  );
}
