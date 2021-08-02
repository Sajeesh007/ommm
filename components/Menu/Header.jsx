import { useState } from 'react';
import logo from '/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { FiMenu } from "react-icons/fi";
import Menu from './Menu';

export default function Header({isHome}) {

  const [menuHidden, setMenuHidden] = useState(true)

  const handleClick = ()=> {
    setMenuHidden(!menuHidden)
  } 
 
  return (
    <div className=' bg-red-500 flex justify-between sticky top-0 z-50 shadow-xl h-12'>
        <div className="flex items-center pt-1">
          <Link href='/' className='cursor-pointer'>
            <a>
            <Image className="object-contain" 
            src={logo} height={50} width={150} alt='logo'/>
            </a>
          </Link>
        </div> 
        <div className='text-white flex justify-center items-center pr-2 md:hidden' onClick={handleClick}>
          <FiMenu className='h-8 w-8'/>
        </div>  
        {!menuHidden && <Menu handleClick={handleClick}/> }
    </div>
  )
}