import {useEffect} from "react"
import Banner from "../components//Cards/Banner"
import Header from "/components/Menu/Header"
import HomeGrid from "../components/Grid/HomeGrid"
import Footer from "../components/Menu/Footer"
import axios from "axios"
import {useAlbum} from '../store/ContextProvider'
import {albumId} from '../utils/albums'
import ReleaseCard from "../components/Cards/ReleaseCard"


export default function Home({albumDetails}) {

  const {setAlbumData,setCurrentAlbum} = useAlbum()

  useEffect(() => {
    setAlbumData(albumDetails.albums) 
    setCurrentAlbum(albumDetails.albums[0])
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

  const token = await axios.get(`${process.env.PRODUCTION ? process.env.PRODUCTION_URL : process.env.DEVELOPEMENT_URL}api/token`) 
  const albumDetails = await axios.get(`${process.env.PRODUCTION ? process.env.PRODUCTION_URL : process.env.DEVELOPEMENT_URL}api/album/${token.data.toString()}/${albumId.join('/')}`)
  return {
    props: {
      albumDetails : albumDetails.data
    }
  }

}
  
