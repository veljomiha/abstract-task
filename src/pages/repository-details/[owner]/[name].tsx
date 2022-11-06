/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import {
  useFetchRepositoryContributors,
  useFetchRepositoryDetails,
  useFetchRepositoryLanguages,
} from '@veljomiha/abstract-task/lib';
import Link from 'next/link';

const RepositoryDetailsPage = () => {
  const router = useRouter();
  const { owner, name } = router.query;
  const fullName = `${owner}/${name}`;
  const { data, isLoading, isError, isFetching } =
    useFetchRepositoryDetails(fullName);
  const { data: dataContributors } = useFetchRepositoryContributors(fullName);
  const { data: dataLanguages } = useFetchRepositoryLanguages(fullName);

  if (isLoading || isFetching) {
    return <div className="loader" />;
  }
  if (isError) {
    return <div className="error">Error fetching data</div>;
  }
  return (
    <div className="container container-padding">
      <div className="details-card">
        <div className="details-card-header" />
        <Link href="/">
          <div className="back-button">
            <img alt="arrow" src="/arrow.svg" />
            Back
          </div>
        </Link>
        <div>
          <img
            alt="avatar"
            className="details-card-photo"
            src={data?.owner?.avatar_url}
          />
        </div>
        <div className="details-card-name">
          <h1>{data?.owner?.login}</h1>
        </div>
        <div className="line" />
        <div>
          <div className="details-card-repo-information">
            <div>
              <p>
                Repository name: <span>{data?.name}</span>
              </p>
              <p>
                Number of forks: <span>{data?.forks_count}</span>
              </p>
              <p>
                Number of stars: <span>{data?.stargazers_count}</span>
              </p>
              <p>
                Number of open issues: <span>{data?.open_issues_count}</span>
              </p>
            </div>
            <div className="line" />
            <div>
              <p>Contributor list:</p>
              <ul>
                {Array.isArray(dataContributors) &&
                  dataContributors
                    .slice(0, 10)
                    .map((contributor: { id?: string; login?: string }) => (
                      <li key={contributor?.id}>
                        <span>{contributor?.login}</span>
                      </li>
                    ))}
              </ul>
            </div>
            <div className="line" />
            <div>
              <p>List of applied programming languages:</p>
              <ul>
                {dataLanguages &&
                  Object.keys(dataLanguages).map(key => (
                    <li key={key}>
                      <span>{key}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="line" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetailsPage;
