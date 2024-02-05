"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/app/_components/utils/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className='grid gap-4'>
          <div className='grid gap-3'>
            <Label className='' htmlFor='field'>
              Username/Email
            </Label>
            <Input
              id='field'
              placeholder='joeblow/joeblow@example.com'
              type='text'
              autoCapitalize='none'
              autoComplete='field'
              autoCorrect='off'
            />
          </div>
          <div className='grid gap-3'>
            <Label className='' htmlFor='password'>
              Password
            </Label>
            <Input
              id='password'
              placeholder='******'
              type='password'
              autoCapitalize='none'
              autoComplete='password'
              autoCorrect='off'
            />
          </div>
          <Button>
            {/* {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )} */}
            Sign In with Email
          </Button>
        </div>
      </form>
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
      <Button variant='outline' type='button'>
        {/* {isLoading ? (
          <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
        ) : (
        )}{" "} */}
        <Icons.gitHub className='mr-2 h-4 w-4' />
        GitHub
      </Button>
    </div>
  );
}
