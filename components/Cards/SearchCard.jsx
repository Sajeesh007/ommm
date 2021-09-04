import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {useAlbum} from '../../store/ContextProvider'


export default function SearchCard({title,artist,image,itemKey}) {
 
  const {setCurrentAlbum,searchAlbumData,setCurrentAlbumId} = useAlbum()

  const [artistState, setArtistState] = useState(artist)
  const [titleState, setTitleState] = useState(title)

  useEffect(() => {
    setArtistState(artist.length > 1 ? artist.join(', ') : artist.join(''))
    setTitleState(title.length > 20 ? title.slice(0,14) + '...' : title)
  }, [])

  const handleClick = (e)=>{
      setCurrentAlbumId(parseInt(e.currentTarget.id))
      setCurrentAlbum(searchAlbumData[parseInt(e.currentTarget.id)]);
  }

  return (
    <div className='hover:cursor-pointer relative border-b py-1' id={itemKey} onClick={handleClick}>
      <Link href={`/releases/${title.replace(/\s+/g, '-').toLowerCase()}`}> 
        <a >
          <div className='flex lg:hover:text-red-500 active:text-red-500 pt-2'>
            <div>
            <Image
              src={image} alt='banners' width={50} height={50}/>
            </div>
            <div className='flex flex-col pl-3'>
              <h1 className='text-base font-semibold md:text-xl'>{titleState}</h1>
              <h3 className='text-sm md:text-base' >{artistState}</h3>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}


