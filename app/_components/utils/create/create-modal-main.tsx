"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusSquare } from "lucide-react";
import { CreateModalTabsMain } from "./create-modal-tabs-main";
import { useState } from "react";

export function CreateModalMain() {
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
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
        <CreateModalTabsMain setCreateDialogOpen={setCreateDialogOpen} />
      </DialogContent>
    </Dialog>
  );
}
