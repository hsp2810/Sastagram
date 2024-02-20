import { Gender } from "@/schemas";

export const findGenderEnum = (gender: string): Gender | undefined => {
  console.log(gender);
  return gender === "MALE"
    ? Gender.MALE
    : gender === "FEMALE"
    ? Gender.FEMALE
    : gender === "TRANSGENDER"
    ? Gender.TRANSGENDER
    : Gender.PREFER_NOT_TO_SAY;
};
