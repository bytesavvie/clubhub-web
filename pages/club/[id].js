import { gql, useQuery } from '@apollo/client';
import { Heading } from 'baseui/heading';
import React from 'react';

import { initializeApollo } from '../../utilities/apollo-client';

const CLUB_QUERY = gql`
  query GetClub($id: ID!) {
    club(id: $id) {
      id
      name
      description
    }
  }
`;

const Club = ({ id }) => {
  const { data, error, loading } = useQuery(CLUB_QUERY, { variables: { id } });

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

export async function getServerSideProps({ params: { id } }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: CLUB_QUERY,
    variables: { id },
  });

  return {
    props: {
      id,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Club;
