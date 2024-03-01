"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabImgUpload from "./content/tab-img-upload";
import { useState } from "react";

export default function TabsContainer() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Tabs defaultValue='upload'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='image'>Upload Image</TabsTrigger>
        <TabsTrigger value='information' disabled={!isOpen}>
          Caption and Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value='image'>
        <TabImgUpload setOpen={setOpen} />
      </TabsContent>
      <TabsContent value='information'>Set Caption</TabsContent>
    </Tabs>
  );
}
