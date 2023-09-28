import React from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchInputSection = () => {
  return (
    <section className="bg-black">
      <div className="w-4/5 max-w-5xl mx-auto py-16">
        <form className="relative">
          <input
            type="text"
            className="w-full outline-none p-2 text-xl rounded-xl"
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