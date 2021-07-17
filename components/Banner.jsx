/* eslint-disable @next/next/no-img-element */
import LatestReleaseBanner from "./LatestReleaseBanner"
import {useAlbum} from '../ContextProvider'

//"https://i.scdn.co/image/ab67616d0000b273f9dbb9e447f536ed411e69eb" src={albumData[0]?.images[0]?.url}   
//image={albumData[0]?.images[1]?.url} title={albumData[0]?.name} artist={albumData[0]?.artists[0]?.name}

export default function Banner() {

	const {latestAlbum} = useAlbum()

  return (
    <div>
     	<div className='absolute z-2' >
			<img className="relative h-96 max-h-100 w-screen filter blur-sm brightness-50 bottom-1 " 
			src={latestAlbum?.images[1]?.url} alt='banners'/>
			<div className='relative -top-48 mb-80 h-96 
			bg-gradient-to-t from-transparent via-blue-900 to-transparent z-2'/>
		</div>
		<LatestReleaseBanner /> 
		
	</div>
  )
}
 