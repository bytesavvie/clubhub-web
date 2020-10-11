import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, KIND as BUTTON_KIND } from 'baseui/button';
import { Heading } from 'baseui/heading';
import { Notification, KIND as NOTIFICATION_KIND } from 'baseui/notification';
import { useRouter } from 'next/router';
import React from 'react';

import { initializeApollo } from '../../utilities/apollo-client';

const CLUB_QUERY = gql`
  query GetClub($id: ID!) {
    club(id: $id) {
      description
      id
      name
    }
  }
`;

const Club = ({ id }) => {
  const router = useRouter();
  const { data, error, loading } = useQuery(CLUB_QUERY, {
    variables: { id },
  });
  const [
    deleteClub,
    { error: deleteError, loading: deleteLoading },
  ] = useMutation(
    gql`
      mutation DeleteClub($id: ID!) {
        deleteClub(id: $id) {
          id
        }
      }
    `,
    {
      update(cache) {
        const success = cache.evict({
          id: cache.identify({
            __typename: 'Club',
            id,
          }),
        });
        cache.gc();
        if (!success) {
          console.error(`Error removing club with id "${id}" from cache`);
        }
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errored!</p>;
  if (!data?.club) return <p>Not found!</p>;

  const handleDelete = async () => {
    await deleteClub({ variables: { id } });

    // eslint-disable-next-line functional/immutable-data
    router.push('/');
  };

  const { club } = data;

  return (
    <>
      <Heading>{club.name}</Heading>
      <div>{club.description}</div>
      <Button
        isLoading={deleteLoading}
        kind={BUTTON_KIND.secondary}
        onClick={handleDelete}
      >
        Delete
      </Button>
      {deleteError && (
        <Notification kind={NOTIFICATION_KIND.negative}>
          Error deleting club: {deleteError.message}
        </Notification>
      )}
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
