import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Icons } from "../../../providers/icons";
import FileInput from "./file-input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash, Trash2 } from "lucide-react";

interface PageProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TabImgUpload({ setOpen }: PageProps) {
  const [uploadedFile, setUploadedFile] = useState<File>();

  return (
    <main className='flex flex-col gap-4 items-center justify-center h-[80vh]'>
      {uploadedFile ? (
        <>
          <Image
            src={"/post-image.jpg"}
            height={50}
            width={325}
            alt='Uploaded Image'
            className='rounded-md border-2'
          />
          <Button
            variant={"destructive"}
            className='p-2'
            onClick={() => {
              setUploadedFile(undefined);
            }}
          >
            <Trash2 />
          </Button>
        </>
      ) : (
        <div className='flex flex-col gap-3 items-center'>
          <Icons.imgUpload />
          <Label htmlFor='picture' className='text-lg font-normal'>
            Upload picture from your computer
          </Label>
          <FileInput
            setOpen={setOpen}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        </div>
      )}
    </main>
  );
}
