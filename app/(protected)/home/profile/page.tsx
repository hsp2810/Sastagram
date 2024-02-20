import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { EditDialog } from "./edit-dialog";
import Image from "next/image";
import PostCard from "@/app/_components/posts/post-card";
import PostCardPreview from "@/app/_components/posts/post-card-preview";
import PostPreviewGrid from "@/app/_components/posts/post-grids/post-preview-grid";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;

  if (!user)
    return (
      <main className='w-full'>
        <h1>No logged in user found</h1>
      </main>
    );

  return (
    <>
      <main className='flex flex-col w-full m-auto'>
        <section className='flex w-full justify-center items-start my-10'>
          <div className='flex items-start space-x-10 max-w-lg'>
            <Avatar className='w-40 h-40'>
              <AvatarImage src='/avatars/01.png' />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-5'>
                <UsernameProvider username={user.username} />
                <EditDialog user={user} />
              </div>
              <div className='flex items-center'>
                <div className='mr-2'>
                  {/* 0 should be replaced with user.posts: number */}
                  <span className='font-bold'>0</span> posts
                </div>
                <Separator orientation='vertical' className='bg-white' />
                <Link href={"#"} className='mx-2'>
                  <span className='font-bold'>{user.followers}</span> followers
                </Link>
                <Separator orientation='vertical' className='bg-white' />
                <Link href={"#"} className='mx-2'>
                  <span className='font-bold'>{user.following}</span> following
                </Link>
              </div>
              <div className='flex gap-2 items-center'>
                <p className='font-bold text-2xl'>{user.name}</p>
                {user.gender === "MALE" ? (
                  <Image src={"/boy.png"} height={5} width={30} alt='Boy' />
                ) : (
                  <Image src={"/girl.png"} height={5} width={30} alt='Girl' />
                )}
              </div>
              <div>
                <p className='text-sm font-light'>{user.bio}</p>
              </div>
            </div>
          </div>
        </section>
        <Separator className='h-[1px] w-full m-auto' />
        <section className='flex flex-col items-center gap-5 my-5'>
          <h1 className='text-lg font-semibold'>Posts</h1>
          <PostPreviewGrid />
        </section>
      </main>
    </>
  );
}

const UsernameProvider = ({ username }: { username: string }) => {
  return (
    <h1
      className={`text-xl font-medium leading-loose bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent`}
    >
      @{username}
    </h1>
  );
};
