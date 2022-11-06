import { useQuery } from 'react-query';

const fetchRepositoryDetails = async (fullName: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/repos/${fullName}`
  );
  return res.json();
};

export const useFetchRepositoryDetails = (fullName: string) =>
  useQuery(['repositoryDetails', fullName], () =>
    fetchRepositoryDetails(fullName)
  );
