"use client";

import * as z from "zod";

import { cn } from "@/lib/utils";
import { Icons } from "@/app/_components/utils/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { actionLogin } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      // Just for the development purposes
      email: "kingharshit@gmail.com",
      password: "password",
    },
  });

  const handleLogin = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      actionLogin(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className={cn("grid gap-6")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username/Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='joeblow/joeblow@example.com'
                        type='text'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid gap-3'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='******'
                        type='password'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>
      <div className='flex gap-2'>
        <Button variant='outline' type='button' className='w-full'>
          {/* {isLoading ? (
          <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
        ) : (
        )}{" "} */}
          <Icons.google className='mr-2 h-4 w-4' />
        </Button>
        <Button variant='outline' type='submit' className='w-full'>
          <Icons.gitHub className='mr-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}