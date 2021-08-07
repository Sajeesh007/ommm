import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Banner from '../../../components/Banner'
import Footer from '../../../components/Menu/Footer'
import Header from '../../../components/Menu/Header'
import ShareButton from '../../../components/ReleaseInfo/ShareButton'
import StreamButton from '../../../components/ReleaseInfo/StreamButton'
import TrackList from '../../../components/ReleaseInfo/TrackList'
import {useAlbum} from '../../../ContextProvider'


export default function Albums() {

  const router = useRouter()
  const { id } = router.query

  const {currentAlbum,setCurrentAlbum,currentAlbumId} = useAlbum()

	useEffect(() => {
    if(currentAlbum == null){
      fetchAlbum()
    }
  }, [])

  const fetchAlbum = async () =>{
    const token = await axios.get(`api/token`)
    const t = await token.data.toString()
    const albumDetails = await axios.get(`api/album/${t}`)
    setCurrentAlbum(albumDetails?.data?.albums[currentAlbumId])
  }


	return (
		<div className='text-white bg-gray-900'> 
      <Header/>
      <Banner image={currentAlbum?.images[0]?.url} 
              title={currentAlbum?.name} 
              artist={currentAlbum?.artists?.map((items)=>items?.name)}
              releaseDate={currentAlbum?.release_date}
              isHome={false}
      />
      <div className='relative flex flex-col pb-4 justify-center items-center'>
        <h1 className='flex justify-center text-white text-2xl font-medium py-2'>Track List</h1>
        <div className='flex bg-gray-100 backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-md'>
          <TrackList/>
        </div>
      </div>
      <div className='relative flex flex-col'>
        <h1 className='flex justify-center text-2xl font-medium '>Stream It</h1>
        <div className='flex flex-col pb-2 justify-center items-center'>
          <StreamButton provider={'spotify'}/>
          <StreamButton provider={'apple'}/>
          <StreamButton provider={'youtube'}/>
        </div>
      </div>
      <div className='relative flex flex-col justify-center items-center pb-4'>
        <h3 className='flex justify-center text-2xl font-medium py-2'>Share to Socials</h3>
        <div className='flex justify-center items-center'>
          <ShareButton provider={'facebook'}/>
          <ShareButton provider={'whatsapp'}/>
          <ShareButton provider={'twitter'}/>
        </div>
      </div>
      <Footer/> 
		</div>
  )
}
