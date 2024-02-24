"use client";

import Image from "next/image";

export default function GenderAvatarProvider({
  gender,
}: {
  gender: string | null;
}) {
  return (
    <>
      {gender === "MALE" ? (
        <Image src={"/boy.png"} height={5} width={30} alt='Boy' />
      ) : (
        <Image src={"/girl.png"} height={5} width={30} alt='Girl' />
      )}
    </>
  );
}
