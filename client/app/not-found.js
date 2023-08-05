import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <h1>404 Not Found</h1>
      <p>
        The page you were looking for could not be found. It might have been
        removed, renamed, or did not exist in the first place.
      </p>

      <Link href='/'>Go to the home page</Link>
    </>
  )
}
