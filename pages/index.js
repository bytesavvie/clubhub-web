import useSWR from 'swr'
import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const Index = () => {
  const { user, logout } = useUser()
  const { data, error } = useSWR(
    user ? ['/api/getFood', user.token] : null,
    fetcher
  )
  if (!user) {
    return (
      <>
        <p>Hi there!</p>
        <p>
          You are not signed in.{' '}
          <Link href={'/auth'}>
            <a>Sign in</a>
          </Link>
        </p>
      </>
    )
  }

  return (
    <div>
      <div>
        <p>You're signed in. Email: {user.email}</p>
        <p
          style={{
            display: 'inline-block',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() => logout()}
        >
          Log out
        </p>
      </div>
      <ul>
        <li>
          <Link href={'/csr'}>
            <a>CSR</a>
          </Link>
        </li>
        <li>
          <Link href={'/ssg'}>
            <a>SSG</a>
          </Link>
        </li>
        <li>
          <Link href={'/ssr'}>
            <a>SSR</a>
          </Link>
        </li>
      </ul>
      {error && <div>Failed to fetch food!</div>}
      {data ? (
        <div>Your favorite food is {data.food}.</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Index
