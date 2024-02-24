"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditUserSchema, Gender } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import FormError from "@/app/_components/auth/form-error";
import FormSuccess from "@/app/_components/auth/form-success";
import { Button } from "@/components/ui/button";
import { Icons } from "@/app/_components/utils/icons";
import { actionEditUserProfile } from "@/actions/user";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { User } from "@prisma/client";
import { findGenderEnum } from "@/lib/gender";

export default function EditDialogForm({ user }: { user: User }) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: `${user.name}`,
      bio: `${user.bio ? user.bio : "Bio is empty"}`,
      gender: findGenderEnum(user.gender as string) as Gender,
    },
  });

  const handleEditUser = async (values: z.infer<typeof EditUserSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      actionEditUserProfile(values).then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <div className='grid gap-4 pt-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEditUser)}>
          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Jow Blow'
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
                name='bio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      {/* <Input
                        {...field}
                        placeholder='I like to swim...'
                        type='text'
                        disabled={isPending}
                      /> */}
                      <Textarea
                        placeholder='I like to swim...'
                        disabled={isPending}
                        {...field}
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
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select your gender' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Gender.MALE}>Male</SelectItem>
                        <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                        <SelectItem value={Gender.TRANSGENDER}>
                          Trans-gender
                        </SelectItem>
                        <SelectItem value={Gender.PREFER_NOT_TO_SAY}>
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              type='submit'
              disabled={isPending}
              size={"sm"}
              className='font-bold mt-2'
            >
              {isPending ? (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                "Update profile"
              )}
            </Button>
            {/* <DialogFooter>
              <DialogClose asChild></DialogClose>
            </DialogFooter> */}
          </div>
        </form>
      </Form>
    </div>
  );
}
