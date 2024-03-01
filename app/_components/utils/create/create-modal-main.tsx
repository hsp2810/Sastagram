import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusSquare } from "lucide-react";
import { CreateModalTabsMain } from "./create-modal-tabs-main";

export function CreateModalMain() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='justify-start text-md font-normal w-full'
          variant={"ghost"}
        >
          <PlusSquare className='mr-2 h-4 w-4' />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <CreateModalTabsMain />
      </DialogContent>
    </Dialog>
  );
}
