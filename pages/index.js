import {useEffect} from "react"
import Prismic from '@prismicio/client'
import axios from "axios"

import Banner from "../components//Cards/Banner"
import Header from "/components/Menu/Header"
import HomeGrid from "../components/Grid/HomeGrid"
import Footer from "../components/Menu/Footer"
import {useAlbum} from '../store/ContextProvider'
import {albumId} from '../utils/albums'
import ReleaseCard from "../components/Cards/ReleaseCard"


export default function Home({albumDetails,playlistDetails}) {

  const {setAlbumData,setCurrentAlbum,setPlaylistData} = useAlbum()
  
  useEffect(() => {
    setAlbumData(albumDetails?.albums) 
    setCurrentAlbum(albumDetails?.albums[0])
    setPlaylistData([playlistDetails])
  }, [])

  return (
    <div>
      <Header isHome/>
      <Banner />
      <ReleaseCard isHome/> 
      <div>
        <HomeGrid title='Latest Releases'/>
        <div className="flex justify-between my-8 border-t-2 border-white border-dashed"/>
        <HomeGrid title='Trending Playlists' isPlaylist/>
      </div>
      <Footer/>
    </div>
  )
}

export async function getServerSideProps() {

  const albumDetails = await axios({
    method: 'post',
    url: `${process.env.NODE_ENV === 'development' ? process.env.DEVELOPEMENT_URL : process.env.PRODUCTION_URL}api/album`,
    data: {
      albumIds : `${albumId.join('%2C')}`
    }
  });
  
  const client = Prismic.client("https://ommm-website.prismic.io/api/v2")
  const playlist = await client.query(
    Prismic.Predicates.at('document.type', 'playlists_page')
  )
  const playlistDetails = Object.values(playlist.results[0].data)


   return {
    props: {
      albumDetails : albumDetails.data,
      playlistDetails : playlistDetails
    }
  }

}
  
