import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export const getPostById = async (id: string) => {
  try {
    return await prisma.post.findUnique({
      where: { id },
      include: { comments: true, uploader: true },
    });
  } catch (error) {
    return null;
  }
};

export const getPostsByUserId = async (id: string) => {
  try {
    return await prisma.post.findMany({
      where: { userId: id },
    });
  } catch (error) {
    return null;
  }
};

export const updatePost = async (id: string, data: any) => {
  try {
    return await prisma.post.update({
      where: { id: id },
      data,
    });
  } catch (error) {
    return null;
  }
};

export const getLikedByUsers = async (likes: string[]) => {
  try {
    const userData = await Promise.all(
      likes.map(async (likeId) => {
        const user = await prisma.user.findUnique({
          where: {
            id: likeId,
          },
        });
        return user;
      })
    );
    const filteredData = userData.filter((user) => user !== null);
    return filteredData;
  } catch (error) {
    return null;
  }
};
