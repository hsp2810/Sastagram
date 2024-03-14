"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabImgUpload from "./content/tab-img-upload";
import { useEffect, useState } from "react";
import TabSettings from "./content/tab-settings";

export default function TabsContainer() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File>();

  // useEffect(() => {
  //   const file = localStorage.getItem("file");
  //   if (!file) return;
  //   setUploadedFile(JSON.parse(file));
  // }, [isOpen]);

  return (
    <Tabs defaultValue='upload' className='w-full py-5'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='image'>Upload Image</TabsTrigger>
        <TabsTrigger value='information' disabled={!isOpen}>
          Caption and Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value='image'>
        <TabImgUpload
          setOpen={setOpen}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
        />
      </TabsContent>
      <TabsContent value='information'>
        <TabSettings uploadedFile={uploadedFile} />
      </TabsContent>
    </Tabs>
  );
}
