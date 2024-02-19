import { Search, Send, Home, PlusSquare, Play } from "lucide-react";

export const navLinks = [
  {
    title: "Home",
    icon: Home,
    variant: "default",
    href: "/home",
  },
  {
    title: "Search",
    icon: Search,
    variant: "ghost",
    href: "/home/search",
  },
  {
    title: "Reels",
    icon: Play,
    variant: "ghost",
    href: "/home/reels",
  },
  {
    title: "Create",
    icon: PlusSquare,
    variant: "ghost",
    href: "/home/create",
  },
  {
    title: "Chats",
    icon: Send,
    variant: "ghost",
    href: "/home/chats",
  },
];
