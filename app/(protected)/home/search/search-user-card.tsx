import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import Link from "next/link";
import { HighlightedText } from "./highlighted-text";

interface PageProps {
  user: User;
  highlight: string;
}

export default function SearchUserCard({ user, highlight }: PageProps) {
  return (
    <Link
      href={`/home/users/${user.username}`}
      className='flex items-center justify-between '
    >
      <div className='flex items-center p-2 transition rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground w-full mr-1'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='' alt='Avatar' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className='block ml-2'>
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
        </div>
      </div>
    </Link>
  );
}
