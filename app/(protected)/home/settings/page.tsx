import { auth } from "@/auth";
import AccountPrivacySelect from "./account-privacy-select";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className='w-1/2 m-auto rounded-md mt-5 p-5 min-h-[90vh]'>
      <h1 className='text-3xl font-bold mb-10'>Settings</h1>
      <div className='flex flex-col gap-3 border px-5 py-3 rounded-md'>
        <div className='flex items-center justify-between'>
          <h2>Account Privacy</h2>
          <AccountPrivacySelect user={user} />
        </div>
        <p className='text-xs font-light'>
          When your account is public, your profile and posts can be seen by
          anyone, on or off Sastagram, even if they do not have an Sastagram
          account.
        </p>
        <p className='text-xs font-light'>
          When your account is private, only the followers you approve can see
          what you share, including your photos or videos on hashtag and
          location pages, and your followers and following lists.
        </p>
      </div>
      <footer className='text-center mt-10 text-xs font-light'>
        <span className='font-normal text-red-700'>IMP : </span>
        Text excerpted from
        <a
          href='https://www.instagram.com'
          target='_blank'
          className='inline ml-1 hover:underline hover:text-blue-400'
        >
          <InstagramLogoIcon className='inline' />
          <span className='ml-1'>Instagram</span>
        </a>{" "}
        By Meta realistic
      </footer>
    </main>
  );
}
