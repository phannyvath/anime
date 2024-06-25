"use server";

export const fetchAnime = async (page: number, searchQuery: string = "") => {
  const url = searchQuery
    ? `https://shikimori.one/api/animes?search=${encodeURIComponent(
        searchQuery
      )}&page=${page}&limit=8&order=popularity`
    : `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};
