import {useEffect} from "react"
import axios from "axios"

import { accessToken, album, playlist} from "../utils/helper"
import Banner from "../components//Cards/Banner"
import Header from "/components/Menu/Header"
import HomeGrid from "../components/Grid/HomeGrid"
import Footer from "../components/Menu/Footer"
import {useAlbum} from '../store/ContextProvider'
import ReleaseCard from "../components/Cards/ReleaseCard"

export default function Home({albumDetails,playlistDetails,prismicRef}) {

  const {setAlbumData,setCurrentAlbum,setPlaylistData,setPrismicRef} = useAlbum()
  
  useEffect(() => {
    setAlbumData(albumDetails) 
    setCurrentAlbum(albumDetails[0])
    setPlaylistData(playlistDetails)
    setPrismicRef(prismicRef)
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

export async function getServerSideProps({_,res}) {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=59'
  )

  console.log('s');

  const ref = await accessToken()
  const {id, genre} = await album(ref,20,1,'desc')
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
      playlistDetails : playlistDetails,
      prismicRef : ref
    }
  }

}
  
