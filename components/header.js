import { Button } from 'baseui/button';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation';
import React from 'react';

import Link from './link';
import { useUser } from '../utilities/auth/use-user';

const Header = () => {
  const { user, logout } = useUser();

  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <Link href="/">ClubHub</Link>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
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
    </HeaderNavigation>
  );
};

export default Header;
