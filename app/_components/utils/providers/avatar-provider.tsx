"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PageProps {
  height: string;
  width: string;
}

export default function AvatarProvider({ height, width }: PageProps) {
  return (
    <Avatar className={`w-${width} h-${height}`}>
      <AvatarImage src='/avatars/01.png' />
      <AvatarFallback>OM</AvatarFallback>
    </Avatar>
  );
}
