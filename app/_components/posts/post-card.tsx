import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PostCard() {
  return (
    <Card>
      <CardHeader className='grid grid-cols-[1fr_110px] items-start gap-4 space-y-0'>
        <div className='flex space-x-2 space-y-1'>
          <Avatar className='w-8 h-8'>
            <AvatarImage src='/avatars/01.png' />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <CardTitle>shadcn/ui</CardTitle>
          <CardDescription>
            Beautifully designed components that you can copy and paste into
            your apps. Accessible. Customizable. Open Source.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex space-x-4 text-sm text-muted-foreground'>
          <div className='flex items-center'>
            <CircleIcon className='mr-1 h-3 w-3 fill-sky-400 text-sky-400' />
            TypeScript
          </div>
          <div className='flex items-center'>
            <StarIcon className='mr-1 h-3 w-3' />
            20k
          </div>
          <div>Updated April 2023</div>
        </div>
      </CardContent>
    </Card>
  );
}
