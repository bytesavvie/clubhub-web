import { gql, useMutation } from '@apollo/client';
import { Button, KIND as BUTTON_KIND } from 'baseui/button';
import { Notification, KIND as NOTIFICATION_KIND } from 'baseui/notification';
import { useRouter } from 'next/router';
import React from 'react';

const ClubSettings = ({ club }) => {
  const router = useRouter();
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
            id: club.id,
          }),
        });
        cache.gc();
        if (!success) {
          console.error(`Error removing club with id "${club.id}" from cache`);
        }
      },
    }
  );

  const handleDelete = async () => {
    await deleteClub({ variables: { id: club.id } });

    // eslint-disable-next-line functional/immutable-data
    router.push('/');
  };

  return (
    <>
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

export default ClubSettings;
