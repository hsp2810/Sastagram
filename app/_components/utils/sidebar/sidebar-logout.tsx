"use client";

import { actionLogout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

export default function SidebarLogout() {
  const handleLogout = async (e: any) => {
    e.preventDefault();
    localStorage.clear();
    await actionLogout();
  };
  return (
    <Button
      variant={"default"}
      onClick={handleLogout}
      className={cn(
        "dark:bg-red-900 dark:text-white hover:dark:bg-red-950 dark:hover:text-white",
        "text-md font-normal w-full"
      )}
    >
      <LogOut className='mr-2 h-4 w-4' />
      <span className={cn("", "text-background dark:text-white")}>Logout</span>
    </Button>
  );
}
