import { HeadingLevel } from 'baseui/heading';
import React from 'react';

import Container from './container';
import Header from './header';

const Layout = ({ children }) => (
  <>
    <Header />
    <Container innerStyle={{ backgroundColor: '#fff' }}>
      <HeadingLevel>{children}</HeadingLevel>
    </Container>
  </>
);

export default Layout;
