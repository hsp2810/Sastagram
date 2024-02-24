import { User } from "@prisma/client";
import SearchForm from "./search-form";

export default function SearchProvider({ allUsers }: { allUsers: User[] }) {
  return (
    <main className='flex flex-col gap-4 w-1/2 m-auto mt-4'>
      <h1 className='text-3xl font-bold'>Search</h1>
      <SearchForm allUsers={allUsers} />
    </main>
  );
}
