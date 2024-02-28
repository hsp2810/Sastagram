"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { navLinks } from "@/data/sidebar-links";
import { Badge } from "@/components/ui/badge";

export function SidebarNavigation({
  notifications,
}: {
  notifications: number;
}) {
  const [links, setLinks] = useState<any[]>(navLinks);
  const router = useRouter();

  const handleClick = (index: number, href: string) => {
    const updatedLinks = [...links];
    updatedLinks.forEach((link, i) => {
      if (i === index) {
        link.variant = "default";
      } else {
        link.variant = "ghost";
      }
    });
    setLinks(updatedLinks);
    router.push(href);
  };

  return (
    <nav className='grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
      {links.map((link, index) => (
        <Button
          key={index}
          className={cn(
            buttonVariants({ variant: link.variant }),
            link.variant === "default"
              ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
              : "bg-inherit dark:text-white",
            "justify-start text-md font-normal"
          )}
          onClick={() => handleClick(index, link.href)}
        >
          <link.icon className='mr-2 h-4 w-4' />
          {link.title}
          {link.hasBadge && notifications !== 0 && (
            <Badge variant='destructive' className='ml-1 rounded-sm px-2 py-1'>
              {notifications}
            </Badge>
          )}
        </Button>
      ))}
    </nav>
  );
}
