"use client";

import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 1;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeProp[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AnimeProp[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (inView && !isSearching) {
      fetchAnime(page).then((res) => {
        setData((prevData) => [...prevData, ...res]);
      });
      page++;
    }
  }, [inView, isSearching]);

  const handleSearch = async () => {
    setIsSearching(true);
    setSearchResults([]);
    page = 0;
    const results = await fetchAnime(1, searchQuery);
    setSearchResults(results);
  };

  return (
    <>
      <section className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for an anime..."
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="p-2 ml-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </section>

      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {(isSearching ? searchResults : data).map(
          (item: AnimeProp, index: number) => (
            <AnimeCard key={item.id} anime={item} index={index} />
          )
        )}
      </section>

      {!isSearching && (
        <section className="flex justify-center items-center w-full">
          <div ref={ref}>
            <Image
              src="/spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        </section>
      )}
    </>
  );
}

export default LoadMore;
