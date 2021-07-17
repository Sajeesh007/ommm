import { useState,useEffect} from "react"
import Banner from "../components/Banner"
import Header from "/components/Header"
import Contentgrid from "../components/Contentgrid"
import Footer from "../components/Footer"
import axios from "axios"
import {useAlbum} from '../ContextProvider'




export default function Home() {

  const {setAlbumData,setLatestAlbum} = useAlbum()

  useEffect(() => {
    axios.get('api/token')
    .then((token)=>{
      const t=token.data.toString()
      axios.get(`api/album/${t}`)
      .then((albumDetails)=>{
        setAlbumData(albumDetails.data.albums)
        setLatestAlbum(albumDetails.data.albums[0])
      })
      .catch((e)=>{
        console.error(e)
      })
    })
    .catch((e)=>{
      console.error(e)
    })
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

  
