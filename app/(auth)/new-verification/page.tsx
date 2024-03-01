"use client";

import { newVerification } from "@/actions/new-verification";
import ErrorCard from "@/app/_components/auth/error-card";
import FormError from "@/app/_components/auth/form-error";
import FormSuccess from "@/app/_components/auth/form-success";
import { Icons } from "@/app/_components/utils/providers/icons";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ConfirmVerificationToken() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const token = useSearchParams().get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  if (!token) return <ErrorCard />;

  return (
    <main className='h-screen flex items-center justify-center'>
      <Card className='shadow-md'>
        <CardHeader>
          <div className='w-full flex flex-col items-center justify-center'>
            <h1 className={cn("text-5xl text-center font-semibold")}>
              🤞Confirming your verification
            </h1>
          </div>
        </CardHeader>
        {!success && !error && (
          <Icons.spinner className='block m-auto mb-6 h-10 w-10 animate-spin' />
        )}
        <div className='w-fit m-auto mb-4'>
          <FormSuccess message={success} />
          <FormError message={error} />
        </div>
        <CardFooter>
          <Button variant={"default"} className='block m-auto'>
            <Link href={"/"}>Back to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
