import { Heading } from 'baseui/heading';
import { useRouter } from 'next/router';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const Club = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(
    gql`
      query GetClub($id: ID!) {
        club(id: $id) {
          id
          name
          description
        }
      }
    `,
    {
      variables: { id },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errored!</p>;
  if (!data?.club) return <p>Not found!</p>;

  const { club } = data;

  return (
    <>
      <Heading>{club.name}</Heading>
      <div>{club.description}</div>
    </>
  );
};

export default Club;
