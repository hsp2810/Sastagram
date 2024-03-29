import { prisma } from "@/lib/prisma";

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
