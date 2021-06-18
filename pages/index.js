import Banner from "../components/Banner"
import Header from "/components/Header"
import Contentgrid from "../components/Contentgrid"
import Footer from "../components/Footer"
import { useState,useEffect } from "react"
import axios from "axios"
import { Credentials } from "../data/Credentials"



export default function Home() {

  const [token, setToken] = useState()
  const [album, setAlbum] = useState([])
  const albumId=['6OVQ4B8gycTANUxCmdvqtm','3u8COOcmk5S0e9R7JCv192','21JcebnQCgHIw7sV6czDLN',
  '2C779wHxdUQIEVIuCOJgMkbI','2gImKIah2kHHVNDDzXrvcF','0dynympnEUFU2XJwhkRH13',
  '0oVC4UUjHcOEngkUwvNLPb','60egehkeWnDfzn9AvlhqBU']
  

  const fetchData = async () => { 

    const spotify = Credentials()
    await axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + Buffer.from(spotify.ClientId + ':' + spotify.ClientSecret, 'binary').toString('base64')//btoa(spotify.ClientId + ':' + spotify.ClientSecret)  
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    }).then(tokenResponse=>{
      setToken(tokenResponse.data.access_token)
      console.log("token "+ tokenResponse.data.access_token);
      fetchAlbum(tokenResponse.data.access_token)
    }).catch(err=>{
      console.log(err);
    }) 
    
  }

  const fetchAlbum = async(access_token) => {
    await axios.get(`https://api.spotify.com/v1/albums?ids=${albumId.join('%')}`, {
      headers: { 'Authorization' : 'Bearer ' + access_token }
    }).then(res=>{
      setAlbum(res.data.albums)
    }).catch(err=>{
      console.log(err);
    })
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <div>
      <Header isHome/>
      <Banner albumData={album}/>
      <Contentgrid title='Latest Releases' viewMore albumData={album}/>
      <div className="flex justify-between border-t-2 border-white border-dashed"/>
      <Contentgrid title='Trending Playlists' viewMore isPlaylist/>
      <Footer/>
    </div>
  )
}


