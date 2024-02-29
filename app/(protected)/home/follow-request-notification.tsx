"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@prisma/client";
import Link from "next/link";
import { useEffect } from "react";

interface PageProps {
  followRequests: User[];
}

export default function FollowRequestNotification({
  followRequests,
}: PageProps) {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: `${followRequests.length} people has requested to follow you`,
      action: (
        <Button size={"sm"} className='mr-3'>
          <Link href={"/home/notifications"}>View</Link>
        </Button>
      ),
    });
  }, []);

  return <></>;
}
