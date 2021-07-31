import Link from 'next/link'
import { IoClose } from "react-icons/io5";

//bg-gradient-to-b from-red-500 via-red-400 to-black
export default function Menu({handleClick}) {
    
  return (
  <div className='backdrop-filter backdrop-blur bg-opacity-80 bg-gray-900 
     h-screen w-screen absolute lg:relative '>
    <div className='text-white flex justify-end items-center pt-2 pr-2 md:hidden' onClick={handleClick}>
          <IoClose className='h-8 w-8'/>
      </div>  
    <div className="flex flex-col items-center pt-4 space-y-3 text-white text-xl font-bold pr-2">
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
