import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";
import SidebarLogout from "./sidebar-logout";

export default function SidebarFooter() {
  return (
    <div className='nav-footer mx-2 flex flex-col gap-5'>
      <div className='flex items-center space-x-4'>
        <Avatar>
          <AvatarImage src='/avatars/01.png' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1'>
          <p className='text-sm font-medium leading-none'>Harshit Patel</p>
          <Link
            href={"/home/profile"}
            className='text-sm text-muted-foreground hover:underline'
          >
            View Profile
          </Link>
        </div>
      </div>
      <SidebarLogout />
    </div>
  );
}
