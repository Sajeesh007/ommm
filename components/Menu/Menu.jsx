import { IoClose } from "react-icons/io5";
import MenuItems from './MenuItems';

//bg-gradient-to-b from-red-500 via-red-400 to-black
export default function Menu({handleClick}) {
  
  return (
    <div className='backdrop-filter backdrop-blur bg-opacity-80 bg-gray-900 h-screen w-screen absolute lg:relative'>
      <div className='text-white flex justify-end items-center pt-2 pr-2' onClick={handleClick}>
        <IoClose className='h-8 w-8'/>
      </div>  
      <MenuItems/> 
    </div>
  )
}
