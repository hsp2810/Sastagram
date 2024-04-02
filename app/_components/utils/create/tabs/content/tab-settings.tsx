import Image from "next/image";
import TabSettingsForm from "./tab-settings-form";

interface PageProps {
  uploadedFile: File | undefined;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TabSettings({
  uploadedFile,
  setUploadedFile,
  setOpen,
  setCreateDialogOpen,
}: PageProps) {
  return (
    <main className='h-[80vh] flex flex-col justify-center space-y-5 overflow-scroll p-2'>
      <h1 className='mt-5'>Image Preview</h1>
      {uploadedFile && (
        <Image
          src={URL.createObjectURL(uploadedFile)}
          height={50}
          width={325}
          alt='Image must be in a png/jpg/jpeg format'
          className='rounded-md border-2 text-center w-3/4'
        />
      )}

      <TabSettingsForm
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        setOpen={setOpen}
        setCreateDialogOpen={setCreateDialogOpen}
      />
    </main>
  );
}
