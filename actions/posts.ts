"use server";

import * as z from "zod";
import { CreatePostSchema } from "@/schemas";
import { auth } from "@/auth";
import { destroy, upload } from "@/lib/cloudinary";
import { CloudinaryImage } from "@/types";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { deleteAllCommentsByPostId } from "@/data/commentsdb";
import { Post } from "@prisma/client";
import { updatePost } from "@/data/postdb";

export const actionCreatePost = async (
  formData: FormData,
  values: z.infer<typeof CreatePostSchema>
) => {
  const validatedFields = CreatePostSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { caption, disable_comments } = validatedFields.data;

  const data: CloudinaryImage = await upload(formData);
  console.log("Data: ", data);
  if (!data) return { error: "Error in uploading the file to the cloud" };

  const session = await auth();
  if (!session) return { error: "Session Expired" };
  const loggedInUser = session?.user;

  // const uploadedDate = Date.now();
  // const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
  // const expiresIn = new Date(uploadedDate + twentyFourHoursInMilliseconds);

  const newPost = await prisma.post.create({
    data: {
      public_id: data.public_id,
      sourceUrl: data.secure_url,
      userId: loggedInUser.id,
      caption,
      commentsDisabled: disable_comments,
    },
  });
  if (!newPost) {
    //delete img from cloud
    return { error: "Unable to share your post!" };
  }

  revalidatePath("/profile");
  return { success: "Posted Sucessfully!" };
};

export const actionDeletePost = async (post: Post) => {
  const deletedComments = await deleteAllCommentsByPostId(post.id);
  if (!deletedComments) return { error: "Something went wrong!" };

  // const data = await destroy(post.public_id);
  // console.log(data);
  // if (!data) return { error: "Error in uploading the file to the cloud" };

  const deletedPost = await prisma.post.delete({
    where: { id: post.id },
  });
  if (!deletedPost) return { error: "Something went wrong!" };

  redirect("/home/profile");
};

export const actionToggleLikePost = async (post: Post, userId: string) => {
  let updatedLikes: string[];
  if (post.likes.includes(userId)) {
    updatedLikes = post.likes.filter((like) => {
      return like !== userId;
    });
  } else {
    updatedLikes = [...post.likes, userId];
  }

  const updatedComment = await updatePost(post.id, {
    likes: updatedLikes,
  });
  if (!updatedComment) return { error: "Something went wrong!" };

  revalidatePath(`/home/posts/${post.id}`);
};
