"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import LoginModal from "./login/login-modal";
import SignupModal from "./signup/signup-modal";
import LogoProvider from "../utils/providers/logo-provider";

export default function AuthProvider() {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const toggleClick = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <div className='container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Button
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
        onClick={toggleClick}
      >
        {showLogin ? "Signup" : "Login"}
      </Button>
      <div className='relative h-full flex-col bg-muted px-8 p-3 text-white lg:flex dark:border-r'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: "url('/auth-bg.jpg')",
            opacity: 0.25,
          }}
        />
        <LogoProvider />
      </div>
      <div className='lg:p-8'>
        <div className='lg:p-8'>
          {showLogin ? <LoginModal /> : <SignupModal />}
        </div>
      </div>
    </div>
  );
}
