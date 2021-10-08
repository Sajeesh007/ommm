import { useRouter } from 'next/router'
import Banner from '../../../components/Cards/Banner'
import ReleaseCard from '../../../components/Cards/ReleaseCard'
import Footer from '../../../components/Menu/Footer'
import Header from '../../../components/Menu/Header'
import ShareButton from '../../../components/ReleaseInfo/ShareButton'
import StreamButton from '../../../components/ReleaseInfo/StreamButton'
import TrackList from '../../../components/ReleaseInfo/TrackList'



export default function Albums() {

  const router = useRouter()
  const { id } = router.query


	return (
		<div> 
      <Header/>
      
      <div className='min-h-screen'>
        <Banner />
        <ReleaseCard /> 
        {/* Trackl list */}
        <div className='relative flex flex-col pb-4 justify-center items-center'>
          <h1 className='flex justify-center text-white text-2xl font-medium py-2'>Track List</h1>
          <div className='flex bg-gray-100 backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-md'>
            <TrackList/>
          </div>
        </div>

        {/* Streaming Options */}
        <div className='relative flex flex-col text-white'>
          <h1 className='flex justify-center text-2xl font-medium '>Stream It</h1>
          <div className='flex flex-col pb-2 justify-center items-center'>
            <StreamButton provider={'spotify'}/>
            <StreamButton provider={'apple'}/>
            <StreamButton provider={'youtube'}/>
          </div>
        </div>

        {/* Social sharing */}
        {/* <div className='relative flex flex-col justify-center items-center pb-4'>
          <h3 className='flex justify-center text-2xl font-medium py-2'>Share to Socials</h3>
          <div className='flex justify-center items-center'>
            <ShareButton provider={'facebook'}/>
            <ShareButton provider={'whatsapp'}/>
            <ShareButton provider={'twitter'}/>
          </div>
        </div> */}
      </div>
        
      <Footer/>   
		</div>
  )
}
