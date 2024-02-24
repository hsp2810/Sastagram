import LogoProvider from "../logo-provider";
import { SidebarNavigation } from "./sidebar-navigation";
import SidebarFooter from "./sidebar-footer";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";

export default async function Sidebar() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className='flex fixed'>
      <div className='group flex w-[18rem] px-3 flex-col gap-4 pt-2 pb-5 data-[collapsed=true]:py-2 h-screen justify-between'>
        <LogoProvider />
        <SidebarNavigation />
        <SidebarFooter user={user} />
      </div>
      <Separator orientation='vertical' className='w-[1px]' />
    </div>
  );
}
