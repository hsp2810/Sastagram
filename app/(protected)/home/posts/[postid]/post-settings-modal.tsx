"use client";

import {
  actionDeleteAllComments,
  actionDisableComments,
} from "@/actions/comments";
import { Icons } from "@/app/_components/utils/providers/icons";
import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";
import React, { useState } from "react";
import CommentsDeleteDialog from "./comments/comments-delete-alert";
import CommentsDeleteAlert from "./comments/comments-delete-alert";
import { actionDeletePost } from "@/actions/posts";

export default function PostSettingsModal({ post }: { post: Post }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDisableComments = async () => {
    toggleModal();
    await actionDisableComments(post.id, post.commentsDisabled as boolean);
  };

  const handleDeleteAllComments = async () => {
    toggleModal();
    await actionDeleteAllComments(post.id);
  };

  const handleDeletePost = async () => {
    toggleModal();
    await actionDeletePost(post.id);
  };

  return (
    <div className='relative'>
      <button onClick={toggleModal} className='transition-opacity duration-300'>
        {isOpen ? <Icons.close /> : <Icons.menu />}
      </button>

      {isOpen && (
        <div className='absolute z-50 top-0 right-0 mt-9 mr-4 p-2 bg-black rounded-lg shadow-lg transition-all duration-500 transform origin-top flex flex-col gap-1'>
          <Button
            variant={"ghost"}
            className='w-full'
            onClick={handleDisableComments}
          >
            {post.commentsDisabled ? "Enable" : "Disable"} Commenting
          </Button>
          <Button
            variant={"ghost"}
            className='w-full'
            onClick={handleDeleteAllComments}
          >
            Delete all Comments
          </Button>
          <Button
            variant={"destructive"}
            className='w-full'
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete Post
          </Button>
          <CommentsDeleteAlert
            showDeleteDialog={showDeleteDialog}
            setShowDeleteDialog={setShowDeleteDialog}
            handleDeletePost={handleDeletePost}
          />
        </div>
      )}
    </div>
  );
}
