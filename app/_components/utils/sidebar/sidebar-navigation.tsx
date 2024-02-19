"use client";

import React, { useState } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { navLinks } from "@/data/sidebar-links";
import { SidebarLink } from "@/types";

export function SidebarNavigation() {
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
        </Button>
      ))}
    </nav>
  );
}
