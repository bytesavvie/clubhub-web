import { AppNavBar, setItemActive } from 'baseui/app-nav-bar';
import React from 'react';
import { ArrowRight, ChevronDown, Delete, Plus, Upload } from 'baseui/icon';

import Link from './link';
import { useUser } from '../utilities/auth/use-user';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const { user, logout } = useUser();

  const [mainItems, setMainItems] = React.useState([
    { icon: Upload, label: 'Main A' },
    {
      icon: ChevronDown,
      label: 'Main B',
      navExitIcon: Delete,
      children: [
        { icon: Upload, label: 'Secondary A' },
        { icon: Upload, label: 'Secondary B' },
      ],
    },
  ]);

  const userItems = [
    { icon: Plus, label: 'Create Club', info: { href: '/club/create' } },
    { icon: ArrowRight, label: 'Logout', info: { logout: true } },
  ];

  const Title = <Link href="/">ClubHub</Link>;

  const handleMenuItemSelect = (item) =>
    setMainItems((previous) => setItemActive(previous, item));

  const handleUserItemSelect = ({ info }) =>
    info.href
      ? // eslint-disable-next-line functional/immutable-data
        router.push(info.href)
      : info.logout
      ? logout()
      : null;

  return (
    <AppNavBar
      title={Title}
      mainItems={mainItems}
      username={user && user.email}
      userItems={userItems}
      onMainItemSelect={handleMenuItemSelect}
      onUserItemSelect={handleUserItemSelect}
    />
  );
};

export default Header;
