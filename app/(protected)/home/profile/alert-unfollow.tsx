"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

interface PageProps {
  showDeleteDialog: boolean;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setApproveUnfollow: React.Dispatch<React.SetStateAction<boolean>>;
  otherUser: User;
}

export default function UnfollowAlert({
  showDeleteDialog,
  setShowDeleteDialog,
  setApproveUnfollow,
  otherUser,
}: PageProps) {
  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you change your mind, you will have to request to follow
            <span className='font-bold ml-1'>{otherUser.username}</span> again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant='destructive'
            onClick={() => {
              setApproveUnfollow(true);
              setShowDeleteDialog(false);
            }}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
