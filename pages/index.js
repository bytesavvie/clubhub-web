import { useStyletron } from 'baseui';
import React from 'react';

import ClubsList, { CLUBS_QUERY } from '../components/club-list';
import Link from '../components/link';
import { initializeApollo } from '../utilities/apollo-client';
import { useUser } from '../utilities/auth/use-user';

const Index = () => {
  const { user } = useUser();
  const [css] = useStyletron();

  if (!user) {
    return (
      <>
        <p className={css({ fontWeight: 'bold' })}>Hi there!</p>
        <p>
          You are not signed in. <Link href="/auth">Sign in</Link>
        </p>
      </>
    );
  }

  return (
    <div>
      <div>
        <p className={css({ fontWeight: 'bold' })}>
          You&apos;re signed in. Email: {user.email}
        </p>
      </div>
      <ul>
        <li>
          <Link href="/csr">CSR</Link>
        </li>
        <li>
          <Link href="/ssg">SSG</Link>
        </li>
        <li>
          <Link href="/ssr">SSR</Link>
        </li>
        <li>
          <Link href="/club/create">Create Club</Link>
        </li>
      </ul>

      <ClubsList />
    </div>
  );
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: CLUBS_QUERY });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
