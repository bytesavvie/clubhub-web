import { StyledLink } from 'baseui/link';
import NextLink from 'next/link';
import React, { forwardRef } from 'react';

const Link = ({ children, external, href, unstyled }) => {
  const LinkComponent = unstyled ? 'a' : StyledLink;

  if (external) {
    return <LinkComponent href={href}>{children}</LinkComponent>;
  }

  const NextLinkChild = forwardRef(({ href, onClick }, ref) => (
    <LinkComponent ref={ref} href={href} onClick={onClick}>
      {children}
    </LinkComponent>
  ));

  return (
    <NextLink passHref href={href}>
      <NextLinkChild />
    </NextLink>
  );
};

export default Link;
