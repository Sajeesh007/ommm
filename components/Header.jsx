import logo from '/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Header({isHome}) {
 
  return (
    <div className=' bg-red-500 flex justify-between sticky top-0 z-50 shadow-xl'>
        <div className="flex items-center pt-1">
          <Link href='/' className='cursor-pointer'>
            <a>
            <Image className="object-contain" 
            src={logo} height={50} width={150} alt='logo'/>
            </a>
          </Link>
        </div>   
        <div className="flex items-center space-x-3 text-white text-lg font-semibold pr-2">
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
          <Link href='/about'>
            <a>
              About
            </a>
          </Link>
        </div>      
    </div>
  )
}
