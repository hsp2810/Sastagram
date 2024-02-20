import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditDialogForm from "./edit-dialog-form";

export function EditDialog({ user }: { user: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className='font-bold'>
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditDialogForm user={user} />
      </DialogContent>
    </Dialog>
  );
}
