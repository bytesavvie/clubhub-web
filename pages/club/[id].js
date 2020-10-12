import { gql, useQuery } from '@apollo/client';
import { Heading } from 'baseui/heading';
import { Tabs, Tab, FILL } from 'baseui/tabs-motion';
import React, { useState } from 'react';

import ClubDetails from '../../components/club/details';
import ClubEvents from '../../components/club/events';
import ClubSettings from '../../components/club/settings';
import ClubSocialFeed from '../../components/club/social-feed';
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
  const [activeKey, setActiveKey] = useState('0');
  const { data, error, loading } = useQuery(CLUB_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errored!</p>;
  if (!data?.club) return <p>Not found!</p>;

  const { club } = data;

  return (
    <>
      <Heading>{club.name}</Heading>

      <Tabs
        activateOnFocus
        activeKey={activeKey}
        fill={FILL.fixed}
        onChange={({ activeKey }) => {
          setActiveKey(activeKey);
        }}
      >
        <Tab title="Details">
          <ClubDetails club={club} />
        </Tab>
        <Tab title="Events">
          <ClubEvents club={club} />
        </Tab>
        <Tab title="Social">
          <ClubSocialFeed club={club} />
        </Tab>
        <Tab title="Settings">
          <ClubSettings club={club} />
        </Tab>
      </Tabs>
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
