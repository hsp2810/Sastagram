"use server";

import {
  deleteFollowRequest,
  removeFollower,
  sendFollowRequest,
  setFollowing,
  setUnFollowing,
} from "@/data/followdb";
import { getUserById } from "@/data/userdb";
import { FollowStatus } from "@/types";
import { User, UserAccountType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const actionSendFollowRequest = async (
  loggedInUser: User,
  otherUser: User,
  followStatus: FollowStatus
) => {
  if (!loggedInUser || !otherUser || !followStatus)
    return { error: "Insufficient Data" };

  const isPrivate = otherUser.account_type === UserAccountType.PRIVATE;
  const isPublic = otherUser.account_type === UserAccountType.PUBLIC;
  const isNoneOrFollow = followStatus === "None" || followStatus === "Follow";
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

  if (followStatus === "Following") {
    const res = await setUnFollowing(loggedInUser, otherUser);
    if (!res) return { error: "Some error occured! Try again later" };

    revalidatePath(`/home/users/${otherUser.id}`);
    return { success: `Unfollowed ${otherUser.name}` };
  }

  if (followStatus === "Follow back") {
    if (isPrivate) {
      const res = await sendFollowRequest(loggedInUser, otherUser);
      if (!res) return { error: "Unable to send follow requests" };

      revalidatePath(`/home/users/${otherUser.id}`);
      return { success: "Follow request sent" };
    } else {
      const res = await setFollowing(loggedInUser, otherUser);
      if (!res) return { error: "Some error occured! Try again later" };

      revalidatePath(`/home/users/${otherUser.id}`);
      return { success: `Started following ${otherUser.name}` };
    }
  }

  if (followStatus === "Requested") {
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

export const actionHandleFollowRequest = async (
  loggedInUser: User,
  otherUser: User,
  action: "confirm" | "delete"
) => {
  const res = await deleteFollowRequest(otherUser, loggedInUser);
  if (!res) return { error: "There are no follow requests" };

  if (action === "confirm") {
    const res1 = await setFollowing(otherUser, loggedInUser);
    if (!res1) return { error: "Some error at following" };
  }

  revalidatePath(`/home/notifications`);
  return { success: `Follow Request ${action}ed` };
};

export const actionRemoveFollower = async (
  loggedInUser: User,
  otherUser: User
) => {
  const res = await removeFollower(loggedInUser, otherUser);
  if (!res) return { error: "There are no follow requests" };

  revalidatePath(`/home/notifications`);
  return { success: `Remove Follower ${otherUser}` };
};
