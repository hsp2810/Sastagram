import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

export default function SidebarLogout() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <Button
        variant={"default"}
        className={cn(
          "dark:bg-red-900 dark:text-white hover:dark:bg-red-950 dark:hover:text-white",
          "text-md font-normal w-full"
        )}
      >
        <LogOut className='mr-2 h-4 w-4' />
        <span className={cn("", "text-background dark:text-white")}>
          Logout
        </span>
      </Button>
    </form>
  );
}
