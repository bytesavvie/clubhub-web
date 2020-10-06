import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-unassigned-import
import 'firebase/auth';

import initFirebase from './init-firebase';
import { mapUserData } from './map-user-data';
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from './user-cookies';

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
          // eslint-disable-next-line functional/immutable-data
          router.push('/auth');
        })
        .catch((error) => {
          console.error(error);
        })
    );
  };

  useEffect(
    () => {
      // Firebase updates the id token every hour, this
      // makes sure the react state and the cookie are
      // both kept up to date
      const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
        if (user) {
          const userData = mapUserData(user);
          setUserCookie(userData);
          setUser(userData);
        } else {
          removeUserCookie();
          setUser();
        }
      });

      const userFromCookie = getUserFromCookie();

      if (!userFromCookie) {
        // eslint-disable-next-line functional/immutable-data
        router.push('/');
        return;
      }

      setUser(userFromCookie);

      return () => {
        cancelAuthListener();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { user, logout };
};

export { useUser };
