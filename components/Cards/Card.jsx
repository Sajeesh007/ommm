import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {useAlbum} from '../../store/ContextProvider'


function Card({image,title,artist,itemKey,isPlaylist,Linkto,genre}) {

  const {setCurrentAlbum,searchAlbumData,albumData,setCurrentAlbumId} = useAlbum()
  const [artistState, setArtistState] = useState(artist)
  const [titleState, setTitleState] = useState(title)

  useEffect(() => {
    !isPlaylist &&  setArtistState(artist.length > 1 ? artist.join(', ') : artist.join(''))
    const t = title.length > 15 ? title.slice(0,14) + '...' : title
    setTitleState(t)
  }, [])

  const handleClick = (e)=>{
    if(isPlaylist)
      window.open(Linkto, '_blank')
    else{
      setCurrentAlbumId(parseInt(e.currentTarget.id))
      if(searchAlbumData){
        setCurrentAlbum(searchAlbumData[parseInt(e.currentTarget.id)])

      }else{
        setCurrentAlbum(albumData[parseInt(e.currentTarget.id)])
      }
    }
  }

  // ${encodeURIComponent(title)}

  return (
    <div className='hover:cursor-pointer relative' id={itemKey} onClick={handleClick}>
      <Link href={`/releases/${title.replace(/\s+/g, '-').toLowerCase()}`}> 
        <a >
          {!isPlaylist && 
            <div className='absolute flex justify-center items-center top-0 right-0 z-10 bg-black h-6 rounded-b-sm rounded-tl-sm'>
              <h1 className='px-1 text-white font-light text-xs md:text-sm'>{genre}</h1>
            </div>}
          <div>
            <Image className='md:hover:transform md:hover:scale-105 md:hover:shadow-lg h-60 w-60 rounded-sm md:h-72 md:w-72'
              src={image} alt='banners' width={320} height={320}/>
          </div>
          <div className='md:hover:text-red-500 active:text-red-500 pt-2'>
          <h1 className='text-base font-semibold md:text-xl'>{titleState}</h1>
            {!isPlaylist && <h1 className='text-sm md:text-base' >{artistState}</h1>}
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Card
