import { gql, useQuery } from '@apollo/client';
import React from 'react';

import Link from './link';

export const CLUBS_QUERY = gql`
  query GetClubs {
    clubs {
      id
      name
    }
  }
`;

const ClubList = () => {
  const { data, error, loading } = useQuery(CLUBS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errored!</p>;
  if (!data?.clubs) return <p>Not found!</p>;

  const { clubs } = data;

  return (
    <ul>
      {clubs.map((club) => (
        <li key={club.id}>
          <Link href={`/club/${encodeURIComponent(club.id)}`}>{club.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ClubList;
