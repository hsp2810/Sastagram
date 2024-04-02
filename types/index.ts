import { User } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export interface SidebarLink {
  title: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  href: string;
  hasBadge: boolean;
}

export interface CloudinaryImage {
  public_url: string;
  secure_url: string;
  signature: string;
  public_id: string;
}

export type FollowStatus =
  | "Follow"
  | "Following"
  | "Requested"
  | "Follow back"
  | "None";

/*

model Story
  id
  uploader User
  content String: Link where the photo or the video is stored in the Cloudinary
  uploadedTime Datetime
  
*/

export interface IComment {
  id: string;
  content: string;
  comment_likes: number;
  isPinned: boolean;
  likes: string[];
  postId: string;
  userId: string;
  commentBy: User;
  uploadedTime: Date;
}
