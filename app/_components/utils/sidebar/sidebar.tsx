import LogoProvider from "../logo-provider";
import { SidebarNavigation } from "./sidebar-navigation";
import SidebarFooter from "./sidebar-footer";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  return (
    <div className='flex fixed'>
      <div className='group flex w-[18rem] pr-10 pl-3 flex-col gap-4 pt-0 pb-3 data-[collapsed=true]:py-2 h-screen justify-between'>
        <LogoProvider />
        <SidebarNavigation />
        <SidebarFooter />
      </div>
      <Separator orientation='vertical' className='w-[1px]' />
    </div>
  );
}
