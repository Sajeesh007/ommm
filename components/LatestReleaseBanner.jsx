/* eslint-disable @next/next/no-img-element */ //src={image}
import {useAlbum} from '../ContextProvider'



export default function LatestReleaseBanner() {

  const {latestAlbum} = useAlbum()


  return (
    <div className='z-10 relative md:flex '>
      <div className=' relative flex justify-center py-16 md:justify-start md:pl-40'>
        <img className='h-1/4 w-3/4 md:h-80 md:w-80' 
        src={latestAlbum?.images[1]?.url} alt='latest release'/>
      </div>
      <div className='relative flex flex-col items-center justify-center bottom-14 md:pt-36 md:pl-10 md:items-start' >
        <h1 className='font-poppins font-bold text-4xl text-white uppercase md:text-5xl' >{latestAlbum?.name}</h1>
        <h3 className='font-poppins text-lg  text-white uppercase md:text-2xl ' >{latestAlbum?.artists[0]?.name}</h3>
      </div>
    </div>
  )
}
