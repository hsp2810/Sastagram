import { LoginForm } from "./login-form";
import Portfolio from "../../utils/components/portfolio";

export default function LoginModal() {
  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-3xl font-semibold tracking-tight'>Login</h1>
        <p className='text-sm text-muted-foreground'>
          Enter your email below to login to your account
        </p>
      </div>
      <LoginForm />
      <Portfolio />
    </div>
  );
}
