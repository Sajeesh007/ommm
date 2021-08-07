import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {useAlbum} from '../../ContextProvider'

function Card({image,title,artist,itemKey}) {

  const router = useRouter()
  const { id } = router.query

 
  const {setCurrentAlbum,albumData,setCurrentAlbumId} = useAlbum()
  const [artistState, setArtistState] = useState(artist)
  const [titleState, setTitleState] = useState(title)


  useEffect(() => {
    const a = artist.length > 1 ? artist.join(', ') : artist.join('')
    setArtistState(a)
    const t = title.length > 17 ? title.slice(0,18) + '...' : title
    setTitleState(t)
  }, [])

  const handleClick = (e)=>{
    e.preventDefault()
    setCurrentAlbumId(parseInt(e.currentTarget.id))
    setCurrentAlbum(albumData?.albums[parseInt(e.currentTarget.id)]);
    router.push(`/releases/${title.replace(/\s+/g, '-').toLowerCase()}`)
  }

 

  return (
    <div className='hover:cursor-pointer' id={itemKey} onClick={handleClick}>
      <div>
        <Image className='md:hover:transform md:hover:scale-105 md:hover:shadow-lg h-60 w-60 rounded-sm md:h-72 md:w-72'
          src={image?.url} alt='banners' width={320} height={320}/>
      </div>
      <div className='md:hover:text-red-500 active:text-red-500 pt-2'>
        <h1 className='text-base font-semibold md:text-xl'>{titleState}</h1>
        <h1 className='text-sm md:text-base' >{artistState}</h1>
      </div>
    </div>
  )
}

export default Card
