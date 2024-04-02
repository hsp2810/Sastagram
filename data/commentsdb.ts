import { prisma } from "@/lib/prisma";

export const getCommentsByPostId = async (id: string) => {
  try {
    return await prisma.comment.findMany({
      where: { postId: id },
      include: { commentBy: true, Post: true },
      orderBy: [
        {
          isPinned: "desc",
        },
        {
          comment_likes: "desc",
        },
        {
          uploadedTime: "desc",
        },
      ],
    });
  } catch (error) {
    return null;
  }
};

export const getCommentWithoutUserByPostId = async (id: string) => {
  try {
    return await prisma.comment.findUnique({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};

export const getCommentsByCommentId = async (id: string) => {
  try {
    return await prisma.comment.findMany({
      where: { id: id },
      include: { commentBy: true },
    });
  } catch (error) {
    return null;
  }
};

export const deleteAllCommentsByPostId = async (id: string) => {
  try {
    return await prisma.comment.deleteMany({
      where: { postId: id },
    });
  } catch (error) {
    return null;
  }
};

export const deleteCommentById = async (id: string) => {
  try {
    return await prisma.comment.delete({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};

export const updateComment = async (id: string, data: any) => {
  try {
    return await prisma.comment.update({
      where: { id },
      data,
    });
  } catch (error) {
    return null;
  }
};
