"use server";

import { LoginSchema, RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export const actionLogin = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  return { success: "Email sent!" };
};

export const actionRegister = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { username, name, email, password } = validatedFields.data;

  const userExist = await prisma.user.findUnique({
    where: { email },
  });
  if (userExist) return { error: "Email already taken. Use a different one!" };

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      name,
      email,
      password: hashedPassword,
    },
  });
  console.log("Printing the new user: ", newUser);
  if (!newUser) return { error: "Something went wrong in creating account!" };

  return { success: "Account created successfully!" };
};
