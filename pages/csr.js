import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

const CSR = () => {
  const { data, error } = useSWR('https://icanhazdadjoke.com/', async (url) => {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });

    return response.json();
  });

  return (
    <div>
      <h1>CSR</h1>
      <p>{error ? 'failed to load' : data ? data.joke : 'Loading...'}</p>
      <Link href="/">Home</Link>
    </div>
  );
};

export default CSR;
