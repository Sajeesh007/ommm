import { useState,useEffect} from "react"
import Banner from "../components/Banner"
import Header from "/components/Header"
import Contentgrid from "../components/Contentgrid"
import Footer from "../components/Footer"
import axios from "axios"
import {useAlbum} from '../ContextProvider'




export default function Home({albumDetails}) {

  const {setAlbumData,setLatestAlbum} = useAlbum()

  useEffect(() => {
    setAlbumData(albumDetails.albums)
    setLatestAlbum(albumDetails.albums[0])
  }, [])
 
  return (
    <div>
      <Header isHome/>
      <Banner/>
      <Contentgrid title='Latest Releases' viewMore/>
      <div className="flex justify-between border-t-2 border-white border-dashed"/>
      <Contentgrid title='Trending Playlists' viewMore isPlaylist/>
      <Footer/>
    </div>
  )
}

export async function getServerSideProps(context) {

  const token = await axios.get('https://ommm.vercel.app/api/token')
  const t = await token.data.toString()
  const albumDetails = await axios.get(`https://ommm.vercel.app/api/album/${t}`)
  return {
    props: {
      albumDetails : albumDetails.data
    }
  }

}
  
