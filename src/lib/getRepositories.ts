import { useQuery } from 'react-query';

const fetchRepositories = async (
  searchTerm: string,
  page: number,
  perPage: number
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/search/repositories?q=${searchTerm}&per_page=${perPage}&page=${page}`
  );
  return res.json();
};

export const useFetchRepositories = (
  searchTerm: string,
  page: number,
  perPage: number
) =>
  useQuery(
    ['repositories', searchTerm, page],
    () => fetchRepositories(searchTerm, page, perPage),
    { keepPreviousData: true, staleTime: 300000 }
  );
