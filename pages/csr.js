import Link from 'next/link';
import React from 'react';
import useSWR from 'swr'

const CSR = () => {
  const { data, error } = useSWR('https://icanhazdadjoke.com/', (url) => fetch(url, {
    headers: { 'Accept': 'application/json' }
  }).then(response => response.json()));

  return (
    <div>
      <h1>CSR</h1>
      <p>{error ? 'failed to load' : !data ? 'Loading...' : data.joke}</p>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </div>
  );
};

export default CSR;
