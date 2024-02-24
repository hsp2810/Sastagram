import { prisma } from "@/lib/prisma";
import { FollowStatus } from "@/types";
import { User, UserAccountType } from "@prisma/client";

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
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

export const sendFollowRequest = async (sender: User, receiver: User) => {
  try {
    const updatedFollowRequests = [...receiver.follow_requests, sender.id];
    await prisma.user.update({
      where: { id: receiver.id },
      data: { follow_requests: updatedFollowRequests },
    });
    return true;
  } catch (error) {
    return null;
  }
};

export const deleteFollowRequest = async (sender: User, receiver: User) => {
  try {
    const updatedFollowRequests = receiver.follow_requests.filter((id) => {
      return id !== sender.id;
    });
    await prisma.user.update({
      where: { id: receiver.id },
      data: { follow_requests: updatedFollowRequests },
    });
    return true;
  } catch (error) {
    return null;
  }
};

export const setFollowing = async (sender: User, receiver: User) => {
  try {
    const updateFollowingUsers = [...sender.following, receiver.id];
    await prisma.user.update({
      where: { id: sender.id },
      data: { following: updateFollowingUsers },
    });

    const updateFollowers = [...receiver.followers, sender.id];
    await prisma.user.update({
      where: { id: receiver.id },
      data: { followers: updateFollowers },
    });

    return true;
  } catch (error) {
    return null;
  }
};

export const setUnFollowing = async (sender: User, receiver: User) => {
  try {
    const updatedFollowing = sender.following.filter((id) => {
      return id !== receiver.id;
    });
    await prisma.user.update({
      where: { id: sender.id },
      data: { following: updatedFollowing },
    });

    const updatedFollowers = receiver.followers.filter((id) => {
      return id !== sender.id;
    });
    await prisma.user.update({
      where: { id: receiver.id },
      data: { followers: updatedFollowers },
    });

    return true;
  } catch (error) {
    return null;
  }
};

//do not need this
export const setFollowers = async (sender: any, receiver: User) => {
  try {
    const updateFollowers = [...receiver.followers, sender.id];
    await prisma.user.update({
      where: { id: receiver.id },
      data: { followers: updateFollowers },
    });
    return true;
  } catch (error) {
    return null;
  }
};

export const checkFollowReqStatus = (
  sender: User,
  receiver: User
): FollowStatus => {
  try {
    const isReqPending = receiver.follow_requests.includes(sender.id);
    if (isReqPending) return "Requested";

    const isFollowing = sender.following.includes(receiver.id);
    if (isFollowing) return "Following";

    const isFollowBack =
      receiver.following.includes(sender.id) &&
      !sender.following.includes(receiver.id);
    if (isFollowBack) return "Follow back";

    return "Follow";
  } catch (error) {
    return "None";
  }
};
