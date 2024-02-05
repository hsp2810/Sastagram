"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import LoginModal from "./login/login-modal";
import SignupModal from "./signup/signup-modal";
import { Pacifico } from "next/font/google";

const dancing_script = Pacifico({ subsets: ["latin"], weight: "400" });

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
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='url(#gradient)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop
                  offset='0%'
                  style={{ stopColor: "#ff6a00", stopOpacity: 1 }}
                />
                <stop
                  offset='100%'
                  style={{ stopColor: "#ee0979", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          <h1
            className={`text-3xl leading-loose font-light bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent ${dancing_script.className}`}
          >
            Sastagram
          </h1>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='lg:p-8'>
          {showLogin ? <LoginModal /> : <SignupModal />}
        </div>
      </div>
    </div>
  );
}
