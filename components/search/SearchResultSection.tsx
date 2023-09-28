import React, { useEffect, useState } from 'react'
import CardList from "../card/CardList";
import { useRouter } from "next/router";
import { GetSearchResponse } from "@/pages/api/getSearchFromNotion";
import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItem";

const SearchResultSection = () => {
  const { query } = useRouter();
  const searchQuery = query.query?.toString();
  const [databaseItems, setDatabaseItems] = useState<ParsedDatabaseItemType[]>([]);

  useEffect(() => {
    if (!searchQuery) return;

    const getSearchResult = async () => {
      const response = await fetch(`/api/getSearchFromNotion?query=${searchQuery}`);

      if (response.ok) {
        const { databaseItems }: GetSearchResponse = await response.json();
        setDatabaseItems(databaseItems);
      }
    };

    getSearchResult();
  }, [searchQuery]);
  

  return (
    <section>
      <div className="w-4/5 max-2-5xl mx-auto my-16">
        <CardList cardItems={databaseItems} />
      </div>
    </section>
  );
}

export default SearchResultSection;