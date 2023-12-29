import Link from "next/link"

export function NotFoundPage() {
  return (
    <div>
      <h1>Group Not Found</h1>
      <p>The group you&apos;re looking for does not exist.</p>
      <Link href="/groups">
        <a>Go back to Groups</a>
      </Link>
    </div>
  )
}

export default NotFoundPage
