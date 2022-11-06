/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';
import { useFetchRepositories } from '@veljomiha/abstract-task/lib';

interface CardProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  activeTab: string;
}

const Cards: FC<CardProps> = ({ page, setPage, activeTab }) => {
  const tab = activeTab.toLocaleLowerCase();
  const itemPerPage = 30;
  const { data, isLoading, isError, isFetching, isPreviousData } =
    useFetchRepositories(tab, page, itemPerPage);
  const lastPage = Math.trunc(data?.total_count / itemPerPage) + 1;

  if (isLoading || isFetching) {
    return <div className="loader" />;
  }

  if (isError) {
    return <div className="error-fetching">Error fetching data</div>;
  }

  return (
    <div className="cards">
      {data?.items?.map(
        (
          item:
            | {
                id: string;
                name: string;
                stargazers_count: number;
                forks_count: number;
                owner?: {
                  login: string;
                  avatar_url: string;
                };
              }
            | undefined
        ) => (
          <Link
            href={`/repository-details/${item?.owner?.login}/${item?.name}`}
            key={item?.id}>
            <div className="card">
              <img
                alt="avatar"
                className="profile-photo"
                src={item?.owner?.avatar_url}
              />
              <div className="card-text">
                <div>
                  <span>Repo name: </span>
                  {item?.name}
                </div>
                <div>
                  <span> Number of stars: </span>
                  {item?.stargazers_count}
                </div>
                <div>
                  <span>Number of forks: </span>
                  {item?.forks_count}
                </div>
                <div>
                  <span>Owner name: </span>
                  {item?.owner?.login}
                </div>
              </div>
            </div>
          </Link>
        )
      )}
      <div className="pagination">
        <button
          className="pagination-arrow"
          onClick={() => setPage(old => Math.max(old - 1, 0))}
          disabled={page === 1}>
          <img alt="arrow" src="/arrow.svg" />
        </button>
        <span className="pagination-pageNumber">{page}</span>
        <button
          className="pagination-arrow pagination-arrow-rotate"
          onClick={() => {
            if (!isPreviousData) {
              setPage(old => old + 1);
            }
          }}
          disabled={page === lastPage}>
          <img alt="arrow" src="/arrow.svg" />
        </button>
      </div>
    </div>
  );
};

export default Cards;
