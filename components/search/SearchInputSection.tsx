import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchInputSection = () => {
  const [value, setValue] = useState('');
  const { push, query } = useRouter();
  const searchQuery = query.query?.toString()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 맨앞,뒤 공백 제거
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    push(`/search?query=${trimmedValue}`);
  };

  useEffect(() => {
    setValue(searchQuery ?? "");
  }, [searchQuery]);
  

  return (
    <section className="bg-black">
      <div className="w-4/5 max-w-5xl mx-auto py-16">
        <form className="relative" onSubmit={onSubmit}>
          <input
            type="text"
            className="w-full outline-none p-2 text-xl rounded-xl"
            value={value}
            onChange={(e)=> setValue(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-xl"
          >
            <BiSearch size={"1.5rem"} color="gray" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchInputSection;