"use server";

import {
  deleteFollowRequest,
  getUserById,
  sendFollowRequest,
  setFollowers,
  setFollowing,
  setUnFollowing,
} from "@/data/userdb";
import { User, UserAccountType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const actionSendFollowRequest = async (formdata: FormData) => {
  const receiverId = formdata.get("sendTo");
  const loggedInUserId = formdata.get("loggedInUserId");
  const currentFollowStatus = formdata.get("followStatus");
  if (!receiverId || !currentFollowStatus || !loggedInUserId)
    return { error: "Insufficient Data" };

  const loggedInUser = await getUserById(loggedInUserId as string);
  if (!loggedInUser) return { error: "Invalid User" };
  const otherUser = await getUserById(receiverId as string);
  if (!otherUser) return { error: "Invalid User" };

  const isPrivate = otherUser.account_type === UserAccountType.PRIVATE;
  const isPublic = otherUser.account_type === UserAccountType.PUBLIC;
  const isNoneOrFollow =
    currentFollowStatus === "None" || currentFollowStatus === "Follow";
  //First - Private
  if (isNoneOrFollow && isPrivate) {
    const res = await sendFollowRequest(loggedInUser, otherUser);
    if (!res) return { error: "Unable to send follow requests" };

    revalidatePath(`/home/users/${otherUser.id}`);
    return { success: "Follow request sent" };
  }

  //First - Public
  if (isNoneOrFollow && isPublic) {
    const res = await setFollowing(loggedInUser, otherUser);
    if (!res) return { error: "Some error occured! Try again later" };

    revalidatePath(`/home/users/${otherUser.id}`);
    return { success: `Started following ${otherUser.name}` };
  }

  if (currentFollowStatus === "Following") {
    const res = await setUnFollowing(loggedInUser, otherUser);
    if (!res) return { error: "Some error occured! Try again later" };

    revalidatePath(`/home/users/${otherUser.id}`);
    return { success: `Unfollowed ${otherUser.name}` };
  }

  if (currentFollowStatus === "Follow back") {
    if (isPrivate) {
      const res = await sendFollowRequest(loggedInUser, otherUser);
      if (!res) return { error: "Unable to send follow requests" };

      revalidatePath(`/home/users/${otherUser.id}`);
      return { success: "Follow request sent" };
    } else {
      const res = await setFollowing(loggedInUser, otherUser);
      if (!res) return { error: "Some error occured! Try again later" };

      const res1 = await setFollowers(loggedInUser, otherUser);
      if (!res1) return { error: "Some error occured! Try again later" };

      revalidatePath(`/home/users/${otherUser.id}`);
      return { success: `Started following ${otherUser.name}` };
    }
  }

  if (currentFollowStatus === "Requested") {
    const res = await deleteFollowRequest(loggedInUser, otherUser);
    if (!res) return { error: "Some error occured! Try again later" };
    revalidatePath(`/home/users/${otherUser.id}`);
    return { success: `Request cancelled` };
  }
};

export const actionSetUnfollowClient = async (
  loggedInUser: User,
  otherUser: User
) => {
  const res = await setUnFollowing(loggedInUser, otherUser);
  if (!res) return { error: "Some error occured! Try again later" };

  revalidatePath(`/home/users/${otherUser.id}`);
  return { success: `Unfollowed ${otherUser.name}` };
};
