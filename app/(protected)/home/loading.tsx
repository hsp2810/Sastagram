import { Icons } from "@/app/_components/utils/providers/icons";
import React from "react";

export default function Loading() {
  return (
    <main className='w-1/12 m-auto'>
      <Icons.spinner className='mr-2 h-6 w-6 animate-spin' />
    </main>
  );
}
