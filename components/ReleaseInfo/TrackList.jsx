import { useState,useEffect} from "react";
import { FiPlay,FiPause } from "react-icons/fi";
import {useAlbum} from '../../ContextProvider'


export default function TrackList() {

  const [icon, setIcon] = useState('')
  const[play,setPlay] = useState(false)
  const [artistState, setArtistState] = useState('')

  const {currentAlbum} = useAlbum()
  
  useEffect(() => {
    if(!play){
      setIcon(<FiPlay className='w-6 h-6 pl-1'/>)
    }else{
      setIcon(<FiPause className='w-6 h-6'/>)
    }
  }, [play])

  useEffect(() => {
    const a = currentAlbum?.tracks?.items[0]?.artists?.map((items)=>items?.name)
    setArtistState(a.length > 1 ? a.join(', ') : a.join('') )
  }, [])

  const handleClick = ()=>{
    setPlay(!play)
  }
  
  return (
    <div className='relative flex items-center w-72 text-white 
    ' >
      <div className='flex ml-2'>
        <h4>#1</h4>
      </div>
      <div className='absolute flex flex-col text-white ml-10 '>
        <h4 className='text-base'>{currentAlbum?.tracks?.items[0]?.name}</h4>
        <h4 className='text-xs'>{artistState}</h4>
      </div>
      <div className='relative flex ml-52 '>
        <div className='flex justify-center items-center rounded-full h-12 w-12 md:hover:cursor-pointer' onClick={handleClick}>
          {icon}
        </div>
      </div>
    </div>
  )
}
