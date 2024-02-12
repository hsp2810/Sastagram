"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Icons } from "../../utils/icons";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Socials() {
  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        type='button'
        className='w-full'
        onClick={() => handleClick("google")}
      >
        {/* {isLoading ? (
    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
  ) : (
  )}{" "} */}
        <Icons.google className='mr-2 h-4 w-4' />
      </Button>
      <Button
        variant='outline'
        type='submit'
        className='w-full'
        onClick={() => handleClick("github")}
      >
        <Icons.gitHub className='mr-2 h-4 w-4' />
      </Button>
    </div>
  );
}
