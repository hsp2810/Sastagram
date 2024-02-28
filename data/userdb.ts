import { prisma } from "@/lib/prisma";
import { UserAccountType } from "@prisma/client";

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    return await prisma.user.findUnique({
      where: { username: username as string },
    });
  } catch (error) {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    return null;
  }
};

export const getUsersByIds = async (idArr: string[]) => {
  try {
    return await prisma.user.findMany({ where: { id: { in: idArr } } });
  } catch (error) {
    return null;
  }
};

export const setAccountPrivacy = async (id: string, type: string) => {
  try {
    const accountType =
      type === "PRIVATE" ? UserAccountType.PRIVATE : UserAccountType.PUBLIC;
    return await prisma.user.update({
      where: { id },
      data: { account_type: accountType },
    });
  } catch (error) {
    return null;
  }
};
