import { useState,useEffect } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'

import { SiApplemusic, SiYoutube, SiSpotify } from "react-icons/si";
import {useAlbum} from '../../store/ContextProvider'

export default function StreamButton({provider}) {

  const [icon,setIcon] = useState('')
  const [url,setUrl] = useState('')

  const {currentAlbum} = useAlbum()

  const router = useRouter()

  useEffect(() => {
    if(provider === 'spotify'){
      setUrl(currentAlbum?.external_urls.spotify)
      setIcon(
        <div className='flex justify-center items-center'>
          <SiSpotify className='h-8 w-8 text-green-500 '/>
          <h2 className='pl-2'>Spotify</h2>
        </div>)
    }else if(provider === 'apple'){
      setUrl('https://www.apple.com/in/apple-music/')
      setIcon(
        <div className='flex justify-center items-center'>
          <SiApplemusic className='h-8 w-8 text-red-500'/>
          <h2 className='pl-2'>Apple Music</h2>
        </div>)
    }else if(provider === 'youtube'){
      setUrl('https://www.youtube.com/ommm7')
      setIcon(
        <div className='flex justify-center items-center'>
          <SiYoutube className='h-9 w-9 text-red-600'/>
          <h2 className='pl-2'>YouTube</h2>
        </div>) 
    }
  }, [provider,currentAlbum])

  // const handleClick = ()=>{
  //   window.open(`${url}`,"_blank");
  // }

  return (
    <Link href={url}>
      <a target="_blank" rel="noreferrer">
        <div className='flex justify-start items-center md:hover:cursor-pointer pl-4 my-3  w-56 h-12 
        rounded-full border-black border-opacity-40 bg-gray-100 backdrop-filter backdrop-blur-lg bg-opacity-10 text-white'>
              {icon} 
        </div>
      </a>
    </Link>
  )
}
