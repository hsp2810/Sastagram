import Image from "next/image";
import TabSettingsForm from "./tab-settings-form";

interface PageProps {
  uploadedFile: File | undefined;
}

export default function TabSettings({ uploadedFile }: PageProps) {
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

      <TabSettingsForm uploadedFile={uploadedFile} />
    </main>
  );
}
