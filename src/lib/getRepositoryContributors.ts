import { useQuery } from 'react-query';

const fetchRepositoryLanguages = async (fullName: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/repos/${fullName}/languages`
  );
  return res.json();
};

export const useFetchRepositoryLanguages = (fullName: string) =>
  useQuery(['repositoryLanguages', fullName], () =>
    fetchRepositoryLanguages(fullName)
  );
