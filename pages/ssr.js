import Link from 'next/link';
import React from 'react';

const Server = ({ joke }) => {
  return (
    <div>
      <h1>SSR</h1>
      <p>{joke}</p>
      <Link href="/">Home</Link>
    </div>
  );
};

export async function getServerSideProps() {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });
  const { joke } = await response.json();

  return {
    props: {
      joke,
    },
  };
}

export default Server;
