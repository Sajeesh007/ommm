import { useState,useEffect} from "react";
import {useAlbum} from '../../ContextProvider'
import AudioPlayer from "./AudioPlayer";


export default function TrackList() {

  
  const [artistState, setArtistState] = useState('')

  const {currentAlbum} = useAlbum()

  useEffect(() => {
    const a = currentAlbum?.tracks?.items[0]?.artists?.map((items)=>items?.name)
    setArtistState(a.length > 1 ? a.join(', ') : a.join('') )
  }, [])

  
  return (
    <div className='relative flex items-center w-72 h-14 text-white' >
      <div className='flex ml-2'>
        <h4>#1</h4>
      </div>
      <div className='absolute flex flex-col text-white ml-10 '>
        <h4 className='text-base'>{currentAlbum?.tracks?.items[0]?.name}</h4>
        <h4 className='text-xs'>{artistState}</h4>
      </div>       
      <AudioPlayer source={currentAlbum?.tracks?.items[0]?.preview_url}/>
    </div>
  )
}
