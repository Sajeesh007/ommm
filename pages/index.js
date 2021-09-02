import {useEffect} from "react"
import axios from "axios"

import { accessToken, album, playlist} from "../utils/helper"
import Banner from "../components//Cards/Banner"
import Header from "/components/Menu/Header"
import HomeGrid from "../components/Grid/HomeGrid"
import Footer from "../components/Menu/Footer"
import {useAlbum} from '../store/ContextProvider'
import ReleaseCard from "../components/Cards/ReleaseCard"
import Skelton from "../components/Skelton/Skelton"
import HeroSkelton from "../components/Skelton/HeroSkelton"

export default function Home({albumDetails,playlistDetails}) {

  const {setAlbumData,setCurrentAlbum,setPlaylistData,albumData} = useAlbum()
  
  useEffect(() => {
    setAlbumData(albumDetails) 
    setCurrentAlbum(albumDetails[0])
    setPlaylistData(playlistDetails)
  }, [])

  return (
    <div>
      <Header isHome/>
      <Banner />

      {
        (albumData) ? (
          <ReleaseCard isHome/> 
        ) : (
        <div className='z-10 flex justify-center items-center'>
          <HeroSkelton/>
        </div>
      )}

      <div>
        {
          (albumData) ? (
            <HomeGrid title='Latest Releases'/>
          ) : (
            <div className='grid grid-cols-2 gap-4 place-items-center my-8 px-2 lg:grid-cols-4'>
              {[1,2,3,4,5,6,7,8].map((item)=><Skelton key={item} isPlaylist/>) }
            </div>
        )}

        <div className="flex justify-between my-8 border-t-2 border-white border-dashed"/>

        <HomeGrid title='Trending Playlists' isPlaylist/>

      </div>
      <Footer/>
    </div>
  )
}

export async function getServerSideProps() {

  const ref = await accessToken()
  const {id, genre} = await album(ref)
  const playlistDetails = await playlist(ref)

  const albumDetails = await axios({
    method: 'post',
    url: `${process.env.NODE_ENV === 'development' ? process.env.DEVELOPEMENT_URL : process.env.PRODUCTION_URL}api/album`,
    data: {
      albumIds : `${id.join('%2C')}`
    }
  })

  albumDetails.data.albums.map((albums,id)=>albums.genre = genre[id])

  return {
    props: {
      albumDetails : albumDetails.data.albums,
      playlistDetails : playlistDetails
    }
  }

}
  
