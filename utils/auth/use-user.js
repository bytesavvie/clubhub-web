import firebase from 'firebase/app';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-unassigned-import
import 'firebase/auth';

import initFirebase from './init-firebase';

initFirebase();

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  const logout = async () => {
    return (
      firebase
        .auth()
        .signOut()
        // eslint-disable-next-line promise/prefer-await-to-then
        .then(() => {
          // Sign-out successful.
          cookies.remove('auth');
          setUser();
          // eslint-disable-next-line functional/immutable-data
          router.push('/auth');
        })
        .catch((error) => {
          console.error(error);
        })
    );
  };

  useEffect(() => {
    const cookie = cookies.get('auth');
    if (!cookie) {
      // eslint-disable-next-line functional/immutable-data
      router.push('/');
      return;
    }

    setUser(JSON.parse(cookie));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, logout };
};

export { useUser };
