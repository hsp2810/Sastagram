"use client";

import { cn } from "@/lib/utils";
import { Icons } from "@/app/_components/utils/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className='grid gap-4'>
          <div className='grid gap-3'>
            <Label className='' htmlFor='email'>
              Username
            </Label>
            <Input
              id='username'
              placeholder='joeblow007'
              type='username'
              autoCapitalize='none'
              autoComplete='username'
              autoCorrect='off'
            />
          </div>
          <div className='grid gap-3'>
            <Label className='' htmlFor='email'>
              Name
            </Label>
            <Input
              id='name'
              placeholder='Jow Blow'
              type='name'
              autoCapitalize='none'
              autoComplete='name'
              autoCorrect='off'
            />
          </div>
          <div className='grid gap-3'>
            <Label className='' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='joeblow@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
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
          <Button>Signup</Button>
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
        <Icons.gitHub className='mr-2 h-4 w-4' />
        GitHub
      </Button>
    </div>
  );
}
