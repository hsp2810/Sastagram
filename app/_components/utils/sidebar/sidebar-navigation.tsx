"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { navLinks } from "@/data/sidebar-links";
import { Badge } from "@/components/ui/badge";
import { CreateModalMain } from "../create/create-modal-main";

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
        <section key={index} className=''>
          {link.title === "Create" ? (
            <CreateModalMain />
          ) : (
            <SidebarLink
              handleClick={handleClick}
              index={index}
              link={link}
              notifications={notifications}
            />
          )}
        </section>
      ))}
    </nav>
  );
}

interface SidebarLinkProps {
  index: number;
  link: any;
  handleClick: any;
  notifications: number;
}

const SidebarLink = ({
  index,
  link,
  handleClick,
  notifications,
}: SidebarLinkProps) => {
  return (
    <Button
      className={cn(
        buttonVariants({ variant: link.variant }),
        link.variant === "default"
          ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
          : "bg-inherit dark:text-white",
        "justify-start text-md font-normal",
        "w-full"
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
  );
};
