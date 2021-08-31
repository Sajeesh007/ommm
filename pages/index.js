import {useEffect} from "react"
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

  const accessToken =  await axios.get('https://ommm-website.prismic.io/api/v2')
  const ref = accessToken.data.refs[0].ref

  const albumPredicates = '[at(document.type, "releases")]'
  const albumOrdering = '[my.releases.release_date desc]'
  const album = await axios.get(`https://ommm-website.prismic.io/api/v2/documents/search?ref=${ref}&q=[${albumPredicates}]&orderings=${albumOrdering}`)
  
  const id = album.data.results.map((releases)=>releases.data.release_details[3].text)
  const genre = album.data.results.map((releases)=>releases.data.release_details[2].text)

  const albumDetails = await axios({
    method: 'post',
    url: `${process.env.NODE_ENV === 'development' ? process.env.DEVELOPEMENT_URL : process.env.PRODUCTION_URL}api/album`,
    data: {
      albumIds : `${id.join('%2C')}`
    }
  })
  albumDetails.data.albums.map((albums,id)=>albums.genre = genre[id])
  
  const playlistPredicates = '[at(document.type, "playlists_page")]'
  const playlist =  await axios.get(`https://ommm-website.prismic.io/api/v2/documents/search?ref=${ref}&q=[${playlistPredicates}]`)
  const playlistDetails = Object.values(playlist.data.results[0].data)

   return {
    props: {
      albumDetails : albumDetails.data,
      playlistDetails : playlistDetails
    }
  }

}
  
