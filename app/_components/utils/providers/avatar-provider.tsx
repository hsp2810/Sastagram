"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PageProps {
  height: string;
  width: string;
  padding?: string;
}

export default function AvatarProvider({ height, width, padding }: PageProps) {
  return (
    <Avatar className={`w-${width} h-${height}`}>
      <AvatarImage src='/avatars/01.png' />
      <AvatarFallback className={padding ? padding : "p-1"}>OM</AvatarFallback>
    </Avatar>
  );
}
