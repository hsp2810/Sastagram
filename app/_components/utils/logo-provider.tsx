"use client";

import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export default function LogoProvider() {
  return (
    <div className='relative z-20 flex items-center text-lg font-medium ml-2'>
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
        className={`text-3xl leading-loose font-light bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent ${pacifico.className}`}
      >
        Sastagram
      </h1>
    </div>
  );
}
