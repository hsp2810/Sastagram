"use server";

import { auth } from "@/auth";
import {
  deleteCommentById,
  getCommentWithoutUserByPostId,
  updateComment,
} from "@/data/commentsdb";
import { getPostById } from "@/data/postdb";
import { prisma } from "@/lib/prisma";
import { IComment } from "@/types";
import { Comment } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const actionAddComment = async (postId: string, comment: string) => {
  const session = await auth();
  if (!session) return { error: "Session Expired" };
  const user = session.user;

  if (!postId || !comment) return { error: "Invalid data to add a comment" };

  const post = await getPostById(postId);
  if (!post) return { error: "Post not found" };

  const newComment = await prisma.comment.create({
    data: {
      content: comment,
      userId: user.id,
      postId: post.id,
      likes: [],
    },
  });

  revalidatePath(`/home/posts/${postId}`);
};

export const actionDisableComments = async (
  postId: string,
  commentsDisabled: boolean
) => {
  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      commentsDisabled: !commentsDisabled,
    },
  });
  if (!updatedPost) return { error: "Something went wrong!" };

  revalidatePath(`/home/posts/${postId}`);
};

export const actionDeleteAllComments = async (postId: string) => {
  const deletedComments = await prisma.comment.deleteMany({
    where: { postId },
  });
  if (!deletedComments) return { error: "Something went wrong!" };

  revalidatePath(`/home/posts/${postId}`);
};

export const actionToggleLikeComment = async (
  postId: string,
  commentId: string,
  userId: string
) => {
  const comment: Comment | null = await getCommentWithoutUserByPostId(
    commentId
  );
  if (!comment) return;

  let updatedLikes: string[];
  if (comment.likes.includes(userId)) {
    updatedLikes = comment.likes.filter((like) => {
      return like !== userId;
    });
  } else {
    updatedLikes = [...comment.likes, userId];
  }

  const updatedComment = await updateComment(commentId, {
    likes: updatedLikes,
    comment_likes: updatedLikes.length,
  });
  if (!updatedComment) return { error: "Something went wrong!" };

  revalidatePath(`/home/posts/${postId}`);
};

export const actionDeleteComment = async (comment: IComment) => {
  const deletedComment = await deleteCommentById(comment.id);
  if (!deletedComment) return;

  revalidatePath(`/home/posts/${comment.postId}`);
};

export const actionTogglePinComment = async (
  comment: IComment,
  isPinned: boolean
) => {
  const updatedComment = await updateComment(comment.id, {
    isPinned: !isPinned,
  });
  if (!updatedComment) return;

  revalidatePath(`/home/posts/${comment.postId}`);
};
