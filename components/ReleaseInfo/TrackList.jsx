import {useAlbum} from '../../store/ContextProvider'
import AudioPlayer from "./AudioPlayer";


export default function TrackList() {

  const {currentAlbum} = useAlbum()
  
  return (
    <div className='relative flex items-center w-72 h-14 text-white' >
      <div className='flex ml-2'>
        <h4>#1</h4>
      </div>
      <div className='absolute flex flex-col text-white ml-10 '>
        <h4 className='text-base'>{currentAlbum?.tracks?.items[0]?.name}</h4>
        <h4 className='text-xs'>
          {
            currentAlbum?.tracks?.items[0]?.artists?.map((items)=>items?.name).length > 1 ?
            currentAlbum?.tracks?.items[0]?.artists?.map((items)=>items?.name).join(', ') : 
            currentAlbum?.tracks?.items[0]?.artists?.map((items)=>items?.name).join('')
          }
        </h4>
      </div>       
      <AudioPlayer source={currentAlbum?.tracks?.items[0]?.preview_url}/>
    </div>
  )
}
