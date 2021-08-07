/* eslint-disable @next/next/no-img-element */
import ReleaseCard from "./Cards/ReleaseCard"

//"https://i.scdn.co/image/ab67616d0000b273f9dbb9e447f536ed411e69eb" src={albumData[0]?.images[0]?.url}   
//image={albumData[0]?.images[1]?.url} title={albumData[0]?.name} artist={albumData[0]?.artists[0]?.name}

//<div className='relative -top-48 mb-80 h-96 bg-gradient-to-t from-transparent via-black to-transparent z-5'/>

export default function Banner({image,title,artist,releaseDate,isHome}) {

  return (
    <div className='bg-gray-900'>
     	<div className='absolute z-0'>
			<img className="relative w-screen h-screen filter blur-sm brightness-50 bottom-154" 
				src={image} alt='banners'/>
			<div className='relative bottom-28 h-32 bg-gradient-to-b from-transparent via-gray-900 to-gray-900'/>
		</div>
		<ReleaseCard image={image} title={title} artist={artist} isHome={isHome} releaseDate={releaseDate}/> 
	</div>
  )
}
 