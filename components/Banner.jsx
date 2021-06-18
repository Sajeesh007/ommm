/* eslint-disable @next/next/no-img-element */
import LatestReleaseBanner from "./LatestReleaseBanner"
//"https://i.scdn.co/image/ab67616d0000b273f9dbb9e447f536ed411e69eb"
export default function Banner({albumData}) {
  return (
    <div>
     	<div className='absolute z-2' >
			 {console.log(albumData)}
			<img className="relative h-96 max-h-100 w-screen filter blur-sm brightness-50 bottom-1 " 
			src={albumData[0]?.images[0]?.url} alt='banners'/>
			<div className='relative -top-48 mb-80 h-96 
			bg-gradient-to-t from-transparent via-blue-900 to-transparent z-2'/>
		</div>
		<LatestReleaseBanner image={albumData[0]?.images[1]?.url} title={albumData[0]?.name} artist={albumData[0]?.artists[0]?.name}/>
	</div>
  )
}
 