import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ErrorCard() {
  return (
    <Card className='shadow-md'>
      <CardHeader>
        <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
          <h1 className={cn("text-5xl text-center font-semibold")}>
            😖Oops! Something went wrong!
          </h1>
        </div>
      </CardHeader>
      <CardFooter>
        <Button variant={"default"} className='block m-auto'>
          <Link href={"/"}>Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
