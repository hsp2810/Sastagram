import Sidebar from "@/app/_components/utils/sidebar/sidebar";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "SastaGram-Home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex'>
      <Sidebar />
      <div className='flex flex-1 my-4 ml-[19%]'>{children}</div>
    </main>
  );
}
