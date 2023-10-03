import React, { useEffect, useState } from 'react'
import CardList from "../card/CardList";
import { useRouter } from "next/router";
import { GetSearchResponse } from "@/pages/api/getSearchFromNotion";
import useSWR from "swr";
import LoadingSpinner from "../common/LoadingSpinner";

const SearchResultSection = () => {
  const { query } = useRouter();
  const searchQuery = query.query?.toString();

  const getSearchResult = async (url) => {
    const response = await fetch(url);
    
    if (response.ok) {
      const { databaseItems }: GetSearchResponse = await response.json();
      return databaseItems;
    }
  };
  
  const { data, error, isLoading } = useSWR(`/api/getSearchFromNotion?query=${searchQuery}`, getSearchResult)

  return (
    <section>
      <div className="w-4/5 max-2-5xl mx-auto my-16">
        {data ? <CardList cardItems={data} /> : null}
        {isLoading? <LoadingSpinner /> : null}
        {error ? <ErrorIndicator error={error} /> : null}
      </div>
    </section>
  );
}

export default SearchResultSection;

interface ErrorIndicatorProps {
  error: Error
}

const ErrorIndicator = ({ error }: ErrorIndicatorProps) => {
  return <div>Something is Wrong! {error.message}</div>
}