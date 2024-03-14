"use client";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, useTransition } from "react";
import { Icons } from "../../../providers/icons";
import { CreatePostSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { actionCreatePost } from "@/actions/posts";
import FormError from "@/app/_components/auth/form-error";
import FormSuccess from "@/app/_components/auth/form-success";
import { useRouter } from "next/navigation";

export default function TabSettingsForm({
  uploadedFile,
}: {
  uploadedFile: File | undefined;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      caption: "",
      disable_comments: false,
    },
  });

  const handleSubmit = async (values: z.infer<typeof CreatePostSchema>) => {
    if (!uploadedFile) return;

    setSuccess("");
    setError("");

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("upload_preset", "sastagram_upload_preset");

    startTransition(() => {
      actionCreatePost(formData, values).then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
          router.push("/");
        }
      });
    });

    //After successfull insertion delete it from localstorage
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='flex flex-col space-y-5'
        >
          <FormField
            control={form.control}
            name='caption'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder='Write a caption'
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='disable_comments'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center space-x-2'>
                    <Switch
                      id='switch'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                    <Label htmlFor='switch'>
                      Disable commenting to this post
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className='text-xs font-light'>
            You can change this later by going to the ··· menu at the top of
            your post.
          </p>
          <div className='flex gap-2'>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                "Share"
              )}
            </Button>
            {/* Later */}
            <Button type='submit' variant={"destructive"} disabled={isPending}>
              {isPending ? (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <FormError message={error} />
      <FormSuccess message={success} />
    </>
  );
}
