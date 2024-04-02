"use server";

import * as z from "zod";
import { CreatePostSchema } from "@/schemas";
import { auth } from "@/auth";
import { upload } from "@/lib/cloudinary";
import { CloudinaryImage } from "@/types";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { deleteAllCommentsByPostId } from "@/data/commentsdb";

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
  if (!data) return { error: "Error in uploading the file to the cloud" };

  const session = await auth();
  if (!session) return { error: "Session Expired" };
  const loggedInUser = session?.user;

  // const uploadedDate = Date.now();
  // const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
  // const expiresIn = new Date(uploadedDate + twentyFourHoursInMilliseconds);

  const newPost = await prisma.post.create({
    data: {
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

export const actionDeletePost = async (postId: string) => {
  const deletedComments = await deleteAllCommentsByPostId(postId);
  if (!deletedComments) return { error: "Something went wrong!" };

  const deletedPost = await prisma.post.delete({
    where: { id: postId },
  });
  if (!deletedPost) return { error: "Something went wrong!" };

  redirect("/home/profile");
};
