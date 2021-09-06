/* eslint-disable @next/next/no-img-element */
import {useAlbum} from '../../store/ContextProvider'


export default function Banner() {

  const {currentAlbum} = useAlbum()

  return (
    
     	<div className='absolute z-0 -top-1 bg-gray-900'>
        <img className="relative w-screen h-screen filter blur-md brightness-50 bg-opacity-10" 
          src={currentAlbum?.images[0]?.url} alt='banners'/>
        <div className='relative bottom-28 h-32 bg-gradient-to-b from-transparent via-gray-900 to-gray-900'/>
		  </div>
  )
}
 