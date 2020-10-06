import { useStyletron } from 'baseui';
import { HeadingLevel } from 'baseui/heading';
import React from 'react';

import Header from './header';

const Layout = ({ children }) => {
  const [css] = useStyletron();

  return (
    <>
      <Header />
      <div className={css({ display: 'flex', justifyContent: 'center' })}>
        <div className={css({ maxWidth: '40em', width: '100%' })}>
          <HeadingLevel>{children}</HeadingLevel>
        </div>
      </div>
    </>
  );
};

export default Layout;
