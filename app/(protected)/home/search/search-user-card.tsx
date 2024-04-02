import { User } from "@prisma/client";
import Link from "next/link";
import { HighlightedText } from "./highlighted-text";
import AvatarProvider from "@/app/_components/utils/providers/avatar-provider";

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
        <AvatarProvider height='9' width='9' />
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
