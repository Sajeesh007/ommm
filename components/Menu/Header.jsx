/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import logo from '/public/logo.png'
import Link from 'next/link'
import { FiMenu } from "react-icons/fi";
import Menu from './Menu';
import MenuItems from './MenuItems';

export default function Header() {

  const [menuHidden, setMenuHidden] = useState(false)
  const [headerBg, setHeaderBg] = useState(false)

  const handleClick = ()=> {
    setMenuHidden(!menuHidden) 
  }
   
  const handleScroll = () => {
    window.scrollY > 40 ? setHeaderBg(true) : setHeaderBg(false)
  }

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
    return()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  }, [])
  
  
  return (
    <>
      {menuHidden ? (
        <div className='justify-between sticky top-0 z-50'>
          <Menu handleClick={handleClick}/>
        </div>) : (

        <div className={headerBg? 'flex bg-gray-100 backdrop-filter backdrop-blur-lg bg-opacity-10 justify-between items-center sticky top-0 z-50 h-12'
        : 'flex justify-between items-center sticky top-0 z-50 h-12'}>

            <div className="flex items-center pt-1">
              <Link href='/' className='cursor-pointer'>
                <a>
                  <img className="object-contain h-20 w-32" src={logo.src} alt='logo'/>
                </a>
              </Link>
            </div> 

            <div className='text-white pr-2 lg:hidden' onClick={handleClick}>
              <FiMenu className='h-8 w-8'/>
            </div>
            
            <div className='hidden lg:flex lg:justify-center lg:items-center'>
              <MenuItems/>
            </div>
        </div>

        )}
    </>
  )
}
