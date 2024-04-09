"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInititals } from "@/lib/initials";

interface PageProps {
  height: string;
  width: string;
  padding?: string;
  url?: string;
  name: string | null;
}

export default function AvatarProvider({
  height,
  width,
  padding,
  url,
  name,
}: PageProps) {
  return (
    <Avatar className={`w-${width} h-${height}`}>
      <AvatarImage src='/avatars/01.png' />
      <AvatarFallback className={padding ? padding : "p-1"}>
        {getInititals(name)}
      </AvatarFallback>
    </Avatar>
  );
}
