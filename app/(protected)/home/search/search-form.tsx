"use client";

import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { Search, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import SearchUserCard from "./search-user-card";

interface PageProps {
  allUsers: User[];
}

export default function SearchForm({ allUsers }: PageProps) {
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);

    const hasNonSpaceCharacters = /\S/.test(inputValue);
    if (!hasNonSpaceCharacters) {
      setFilteredUsers(null);
      return;
    }

    localStorage.setItem("search", inputValue);

    const searchResults = allUsers.filter((user) => {
      return (
        user.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.username?.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
    setFilteredUsers(searchResults);
    localStorage.setItem("users", JSON.stringify(searchResults));
  };

  useEffect(() => {
    const storedSearchValue = localStorage.getItem("search");
    if (typeof storedSearchValue === "string") {
      setSearchValue(storedSearchValue);
    }
    const storedSearchResults = localStorage.getItem("users");
    if (typeof storedSearchResults === "string") {
      setFilteredUsers(JSON.parse(storedSearchResults));
      return;
    }
  }, []);

  return (
    <div className='relative'>
      <Search className='absolute left-2 top-4 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder='Search...'
        className='w-full py-6 pl-8'
        value={searchValue}
        onChange={handleChange}
      />
      {searchValue.length > 0 && (
        <X
          className='absolute right-2 top-4 h-4 w-4 text-muted-foreground hover:cursor-pointer'
          onClick={(e) => {
            e.preventDefault(); // prevent any default behavior of the button click
            setSearchValue("");
            setFilteredUsers(null);
            localStorage.clear();
          }}
        />
      )}
      <div className='space-y-8 mt-10'>
        {!filteredUsers ? (
          <p className='text-sm font-light'>Results will be shown here</p>
        ) : (
          <>
            {filteredUsers.length === 0 ? (
              <p className='text-sm font-light'>
                No users found based on search
              </p>
            ) : (
              <section className='flex flex-col gap-4'>
                {filteredUsers.map((user) => {
                  return (
                    <SearchUserCard
                      key={user.id}
                      user={user}
                      highlight={searchValue}
                    />
                  );
                })}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
