import * as z from "zod";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  TRANSGENDER = "TRANSGENDER",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),

  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Username is required",
    })
    .min(3, {
      message: "Username must be atleast of 3 characters",
    }),

  name: z.string().min(1, {
    message: "Name is required",
  }),

  email: z.string().email({
    message: "Email is required",
  }),

  password: z.string().min(1, { message: "Password is required" }),
  gender: z.nativeEnum(Gender).optional(),
});

export const EditUserSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),

  bio: z.string().max(200, {
    message: "Bio should not be more than 200 characters!",
  }),

  gender: z.nativeEnum(Gender),
});

export const CreatePostSchema = z.object({
  caption: z.string().max(2000, {
    message: "Caption should not be more than 2000 characters",
  }),

  disable_comments: z.boolean().default(false).optional(),
});
