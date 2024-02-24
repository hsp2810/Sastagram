"use server";

import { Gender, LoginSchema, RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerficationEmail } from "@/lib/email";

export const actionLogin = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid Credentials!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerficationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };

        // case "":
        //   return { error: "Email already in use with different provider!" };

        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
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

  const { username, name, email, password, gender } = validatedFields.data;

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
      emailVerified: null,
      password: hashedPassword,
      gender,
    },
  });
  if (!newUser) return { error: "Something went wrong in creating account!" };

  const verificationToken = await generateVerificationToken(email);

  await sendVerficationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};

export const actionLogout = async () => {
  await signOut();
};
