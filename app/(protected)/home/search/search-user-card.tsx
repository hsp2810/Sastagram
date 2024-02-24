import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import Link from "next/link";
import { HighlightedText } from "./highlighted-text";
import { actionSendFollowRequest } from "@/actions/follow";
import { checkFollowReqStatus } from "@/data/userdb";
import { auth } from "@/auth";

interface PageProps {
  user: User;
  highlight: string;
}

export default function SearchUserCard({ user, highlight }: PageProps) {
  return (
    <div className='flex items-center justify-between '>
      <div className='flex items-center p-2 transition rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground w-full mr-1'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='' alt='Avatar' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <Link href={`/home/users/${user.id}`} className='block ml-2'>
          <HighlightedText
            text={user.name as string}
            highlight={highlight}
            isName
          />
          <div className='flex gap-1 items-center'>
            <HighlightedText
              text={user.username as string}
              highlight={highlight}
              isName={false}
            />
            <span className='text-xs font-light text-muted-foregroune'>
              • {user.followers.length} followers
            </span>
          </div>
        </Link>
      </div>
      {/* <form action={actionSendFollowRequest}>
        <input type='hidden' name='sendTo' value={user.id} />
        <Button variant={"outline"} className='py-6'>
          Follow
        </Button>
      </form> */}
    </div>
  );
}
