import cookies from 'js-cookie';

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth');

  return cookie ? JSON.parse(cookie) : null;
};

export const setUserCookie = (user) => {
  cookies.set('auth', user, {
    // Firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24,
  });
};

export const removeUserCookie = () => cookies.remove('auth');
