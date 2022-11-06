import { useQuery } from 'react-query';

const fetchRepositoryContributors = async (fullName: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/repos/${fullName}/contributors`
  );
  return res.json();
};

export const useFetchRepositoryContributors = (fullName: string) =>
  useQuery(['repositoryContributors', fullName], () =>
    fetchRepositoryContributors(fullName)
  );
