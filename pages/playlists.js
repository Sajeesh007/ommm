import { useEffect} from 'react'

import { accessToken,playlist } from '../utils/helper'
import ContentGrid from '../components/Grid/ContentGrid'
import Header from '../components/Menu/Header'
import Footer from '../components/Menu/Footer'
import { useAlbum } from '../store/ContextProvider'
import Skelton from '../components/Skelton/Skelton'


export default function Playlists() {

  const {setPlaylistData,playlistData} = useAlbum()

  useEffect(() => {
    if(playlistData === null){
      fetchPlaylist()
    }
  }, [])

  const fetchPlaylist = async() => {
    const ref = await accessToken()
    const playlistDetails = await playlist(ref)
    setPlaylistData(playlistDetails)
  }

  return (
    <div>
      <Header/>
      <div className='relative text-white pt-4'>
        <div className='flex justify-center lg:justify-start lg:ml-2 xl:ml-6'>
          <h1 className="font-bold text-4xl flex justify-center">Playlists</h1>
        </div>
        
        {
          (playlistData) ? (
            <ContentGrid isPlaylist={true}/>
          ) : (
            <div className='grid grid-cols-2 gap-4 place-items-center my-8 px-2 lg:grid-cols-4'>
              {[1,2,3,4,5,6,7,8].map((item)=><Skelton key={item} isPlaylist/>) }
            </div>
        )}
        
      </div>
      <Footer/>
    </div>
  )
}
