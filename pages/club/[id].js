import { Heading } from 'baseui/heading';
import { useRouter } from 'next/router';
import React from 'react';

const Club = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Heading>{id}</Heading>
      <div>Description</div>
    </>
  );
};

export default Club;
