import Image from "next/image";
import Link from "next/link";

export default function PostCardPreview() {
  return (
    <Link href={""} className='transition hover:scale-[1.01]'>
      <Image
        src={"/post-image.jpg"}
        height={300}
        width={300}
        alt=''
        className='w-[300px] h-[300px] object-cover rounded-sm'
      />
    </Link>
  );
}
