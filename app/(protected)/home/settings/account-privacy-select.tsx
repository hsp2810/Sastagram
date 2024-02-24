"use client";

import { actionSetPrivacy } from "@/actions/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setAccountPrivacy } from "@/data/userdb";
import { UserAccountType } from "@prisma/client";

export default function AccountPrivacySelect({ user }: { user: any }) {
  const handleValueChange = async (e: UserAccountType) => {
    await actionSetPrivacy(user.id, e);
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={user.account_type}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={user.account_type} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={UserAccountType.PUBLIC}>Public</SelectItem>
        <SelectItem value={UserAccountType.PRIVATE}>Private</SelectItem>
      </SelectContent>
    </Select>
  );
}
