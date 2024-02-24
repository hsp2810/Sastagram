import { Icons } from "@/app/_components/utils/icons";
import React from "react";

export default function Loading() {
  return (
    <main className='w-3/4 m-auto'>
      <Icons.spinner className='mr-2 h-6 w-6 animate-spin' />
    </main>
  );
}
