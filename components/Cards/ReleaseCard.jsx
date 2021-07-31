/* eslint-disable @next/next/no-img-element */ //src={image}
import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'



export default function ReleaseCard({image,title,artist,releaseDate,isHome}) {

  const [artistState, setArtistState] = useState('')

  useEffect(() => {
    setArtistState(artist.length > 1 ? artist.join(', ') : artist.join(''))
    
  }, [])

  return (
    <div className='z-10 relative md:flex '>
      <div className='relative flex justify-center pt-8 pb-16 md:justify-start md:pl-40'>
        <img className='h-1/4 w-3/4 md:h-80 md:w-80' 
        src={image} alt='latest release'/>
      </div>
      <div className='relative flex flex-col items-center justify-center bottom-10 md:pt-36 md:pl-10 md:items-start' >
        <h1 className='font-poppins font-bold text-4xl text-white uppercase md:text-5xl' >{title}</h1>
        <h3 className='font-poppins text-lg  text-white uppercase md:text-2xl ' >{artistState}</h3>
        {!isHome && <h3 className='opacity-75'>Released {dateFormat(releaseDate, 'mmmm d, yyyy')}</h3> }
      </div>
    </div>
  )
}
