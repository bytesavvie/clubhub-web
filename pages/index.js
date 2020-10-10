import { useStyletron } from 'baseui';
import { DatePicker } from 'baseui/datepicker';
import React, { useState } from 'react';

import Link from '../components/link';
import { useUser } from '../utilities/auth/use-user';

const Index = () => {
  const { user, logout } = useUser();
  const [css] = useStyletron();
  const [value, setValue] = useState([new Date()]);

  if (!user) {
    return (
      <>
        <p className={css({ fontWeight: 'bold' })}>Hi there!</p>
        <p>
          You are not signed in. <Link href="/auth">Sign in</Link>
        </p>
      </>
    );
  }

  return (
    <div>
      <div>
        <p className={css({ color: 'blue', fontWeight: 'bold' })}>
          You&apos;re signed in. Email: {user.email}
        </p>
        <button
          className={css({
            display: 'inline-block',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          })}
          type="button"
          onClick={() => logout()}
        >
          Log out
        </button>
      </div>
      <ul>
        <li>
          <Link href="/csr">CSR</Link>
        </li>
        <li>
          <Link href="/ssg">SSG</Link>
        </li>
        <li>
          <Link href="/ssr">SSR</Link>
        </li>
        <li>
          <Link href="/club/create">Create Club</Link>
        </li>
      </ul>

      <DatePicker
        value={value}
        onChange={({ date }) => setValue(Array.isArray(date) ? date : [date])}
      />

      {new Array(100).fill().map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={index}>{index}</p>
      ))}
    </div>
  );
};

export default Index;
