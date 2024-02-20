import { LucideIcon } from "lucide-react";

export interface SidebarLink {
  title: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  href: string;
}

/*

model Story
  id
  uploader User
  content String: Link where the photo or the video is stored in the Cloudinary
  uploadedTime Datetime
  
*/
