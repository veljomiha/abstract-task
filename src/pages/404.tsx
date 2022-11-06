import Link from 'next/link';

const NotFoundPage = () => (
  <div className="not-found">
    <div className="not-found-text">
      Sorry, we can&apos;t find the page you&apos;re looking for. It might have
      been removed or renamed, or maybe it never existed.
    </div>
    <Link href="/">
      <div className="not-found-button">Go home</div>
    </Link>
  </div>
);

export default NotFoundPage;
