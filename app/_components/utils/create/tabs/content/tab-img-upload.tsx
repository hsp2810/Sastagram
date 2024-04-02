import { Label } from "@/components/ui/label";
import { Icons } from "../../../providers/icons";
import FileInput from "./file-input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface PageProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFile: File | undefined;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export default function TabImgUpload({
  setOpen,
  uploadedFile,
  setUploadedFile,
}: PageProps) {
  const handleDeleteImage = async () => {
    setUploadedFile(undefined);
  };

  return (
    <main className='flex flex-col gap-4 items-center justify-center h-[80vh]'>
      {uploadedFile ? (
        <section className='flex flex-col gap-2'>
          <h1 className='text-2xl'>Uploaded Image</h1>
          <p className='text-xs font-light'>
            Delete to upload another one or set a caption and other settings for
            the post
          </p>
          <Image
            src={URL.createObjectURL(uploadedFile)}
            height={50}
            width={325}
            alt='Image must be in a png/jpg/jpeg format'
            className='rounded-md border-2 text-center w-3/4'
          />
          <Button
            variant={"destructive"}
            className='p-2'
            onClick={handleDeleteImage}
          >
            <Trash2 />
          </Button>
        </section>
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
