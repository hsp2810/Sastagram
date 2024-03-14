"use client";

import { Button } from "@/components/ui/button";
import React, { useRef } from "react";

interface PageProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFile: File | undefined;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export default function FileInput({ setOpen, setUploadedFile }: PageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      setUploadedFile(selectedFile);
      // console.log(JSON.stringify(selectedFile));
      // localStorage.setItem("file", JSON.stringify(selectedFile));
      setOpen(true);
    }
  };

  return (
    <div className='flex items-center'>
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        onChange={handleFileChange}
      />

      <Button onClick={handleButtonClick}>Choose file</Button>
    </div>
  );
}
