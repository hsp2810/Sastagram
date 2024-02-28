import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";
import SidebarLogout from "./sidebar-logout";
import { Settings } from "lucide-react";
import AvatarProvider from "../avatar-provider";

export default function SidebarFooter({ user }: { user: any }) {
  return (
    <div className='nav-footer mx-2 flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <AvatarProvider height='10' width='10' />
          <div className='flex flex-col gap-1'>
            <p className='text-md font-semibold leading-none'>{user.name}</p>
            <Link
              href={"/home/profile"}
              className='text-sm text-muted-foreground hover:underline'
            >
              View Profile
            </Link>
          </div>
        </div>
        <Link
          href={"/home/settings"}
          className='hover:bg-accent p-2 rounded-full'
        >
          <Settings />
        </Link>
      </div>
      <SidebarLogout />
    </div>
  );
}
