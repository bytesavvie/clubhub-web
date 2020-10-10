import { StyledLink } from 'baseui/link';
import NextLink from 'next/link';
import React from 'react';

const Link = ({ children, external, href, unstyled }) => {
  const LinkComponent = unstyled ? 'a' : StyledLink;

  return external ? (
    <LinkComponent href={href}>{children}</LinkComponent>
  ) : (
    <NextLink passHref href={href}>
      <LinkComponent>{children}</LinkComponent>
    </NextLink>
  );
};

export default Link;
