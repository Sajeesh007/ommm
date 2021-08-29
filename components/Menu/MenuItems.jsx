import Link from 'next/link'

export default function MenuItems() {
  return (
    <>
      <div className="flex flex-col items-center pt-4 space-y-3 text-white text-xl font-semibold 
      lg:flex-row lg:space-x-3 lg:space-y-0 lg:pt-0 lg:pr-4">
        <Link href='/'>
          <a>
            Home
          </a>
        </Link>

        <Link href='/releases'>
          <a>
            Releases
          </a>
        </Link>

        <Link href='/playlists'>
          <a>
            Playlists
          </a>
        </Link>
        <Link href='/submissions/demo'>
          <a>
            Submission
          </a>
        </Link>
        <Link href='/about'>
          <a>
            About
          </a>
        </Link>
      </div>     
    </>
  )
}
