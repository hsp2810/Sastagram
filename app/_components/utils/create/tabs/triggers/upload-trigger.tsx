"use client";

import { TabsTrigger } from "@radix-ui/react-tabs";
import React from "react";

export default function UploadTrigger() {
  return (
    <TabsTrigger value='information' disabled>
      Caption and Settings
    </TabsTrigger>
  );
}
