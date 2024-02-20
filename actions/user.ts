"use server";

import * as z from "zod";
import { EditUserSchema } from "@/schemas";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const actionEditUserProfile = async (
  values: z.infer<typeof EditUserSchema>
) => {
  const validatedFields = EditUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const session = await auth();
  if (!session?.user) return { error: "Session Expired!" };

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: { ...values },
  });

  if (!updatedUser) return { error: "Problem in updating user profile" };

  revalidatePath("/home/profile");

  return { success: "User profile updated!" };
};
