import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation';
import React from 'react';

import Container from './container';
import Link from './link';
import { useUser } from '../utilities/auth/use-user';

const Header = () => {
  const { user, logout } = useUser();
  const [css] = useStyletron();

  return (
    <HeaderNavigation>
      <Container innerStyle={{ display: 'flex' }}>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem className={css({ paddingLeft: 0 })}>
            <Link href="/">ClubHub</Link>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center}>
          <StyledNavigationItem>
            <Link href="/club/create">Create Club</Link>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            {user ? (
              <Button onClick={() => logout()}>Logout</Button>
            ) : (
              <Link unstyled href="/auth">
                <Button>Login</Button>
              </Link>
            )}
          </StyledNavigationItem>
        </StyledNavigationList>
      </Container>
    </HeaderNavigation>
  );
};

export default Header;
