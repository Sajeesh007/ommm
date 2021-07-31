import { useEffect, useState } from 'react';
import { FaFacebook,FaWhatsapp,FaTwitter } from 'react-icons/fa';


export default function ShareButtons({provider}) {

  const [icon,setIcon] = useState('')
  const [url,setUrl] = useState('')


  useEffect(() => {
    if(provider === 'facebook'){
      setIcon(
        <div className='flex'>
            <FaFacebook className='h-8 w-8 text-blue-600'/> 
        </div>)
    }else if(provider === 'whatsapp'){
      setIcon(
        <div className='flex'>
          <FaWhatsapp className='h-8 w-8 text-green-600'/>
        </div>)
    }else if(provider === 'twitter'){
      setIcon(
        <div className='flex'>
          <FaTwitter className='h-8 w-8 text-blue-600'/>
        </div>) 
    }
  }, [provider])

  const handleClick = ()=>{

  }

  return (
    <div className='relative flex justify-center items-center px-4' onClick={handleClick} >
        {icon}
    </div>
  )
}
