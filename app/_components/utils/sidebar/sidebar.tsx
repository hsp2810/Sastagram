import LogoProvider from "../logo-provider";
import { SidebarNavigation } from "./sidebar-navigation";
import SidebarFooter from "./sidebar-footer";

export default function Sidebar() {
  return (
    <div className='group flex flex-[15] flex-col gap-4 px-2 pt-0 pb-3 data-[collapsed=true]:py-2 h-screen justify-between'>
      <LogoProvider />
      <SidebarNavigation />
      <SidebarFooter />
    </div>
  );
}
