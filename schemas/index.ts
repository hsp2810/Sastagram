import * as z from "zod";

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
});
