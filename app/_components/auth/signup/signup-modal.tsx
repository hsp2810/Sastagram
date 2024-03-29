import { SignupForm } from "./signup-form";
import Link from "next/link";
import Portfolio from "../../utils/providers/portfolio";

export default function SignupModal() {
  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-3xl font-semibold tracking-tight'>
          Create an account
        </h1>
      </div>
      <SignupForm />
      <p className='px-8 text-center text-sm text-muted-foreground'>
        By clicking continue, you agree to our{" "}
        <Link
          href='/terms'
          className='underline underline-offset-4 hover:text-primary'
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href='/privacy'
          className='underline underline-offset-4 hover:text-primary'
        >
          Privacy Policy
        </Link>
        .
      </p>
      <Portfolio />
    </div>
  );
}
