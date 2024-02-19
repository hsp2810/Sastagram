import React from "react";

export default function Portfolio() {
  return (
    <div className='px-8 text-center text-sm text-muted-foreground uppercase'>
      © 2024 Sastagram BY
      <div className='ml-1 group relative inline-block'>
        <a
          href='https://harshitpatel.netlify.app/'
          className='hover:underline'
          target='_blank'
        >
          HARSHIT PATEL
        </a>
        <div className='w-full absolute bg-gray-800 text-white text-center rounded p-2 invisible opacity-0 bottom-full left-1/2 transform -translate-x-1/2 transition-opacity duration-300 group-hover:opacity-100 group-hover:visible'>
          View Portfolio
        </div>
      </div>
    </div>
  );
}
