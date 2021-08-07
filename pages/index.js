import {useEffect} from "react"
import Banner from "../components/Banner"
import Header from "/components/Menu/Header"
import HomeGrid from "../components/Grid/HomeGrid"
import Footer from "../components/Menu/Footer"
import axios from "axios"
import {useAlbum} from '../ContextProvider'


export default function Home({albumDetails}) {

  const {setAlbumData,albumData} = useAlbum()


  useEffect(() => {
    albumData === null && setAlbumData(albumDetails) 
  }, [albumDetails,setAlbumData,albumData])
  
  return (
    <div>
      <Header isHome/>
      <Banner image={albumDetails.albums[0].images[0].url} 
              title={albumDetails.albums[0].name} 
              artist={albumDetails.albums[0].artists?.map((items)=>items?.name)}
              isHome
      />
      <div className='bg-gray-900'>
        <HomeGrid title='Latest Releases'/>
        <div className="flex justify-between border-t-2 border-white border-dashed"/>
        <HomeGrid title='Trending Playlists' isPlaylist/>
      </div>
      <Footer/>
    </div>
  )
}

export async function getServerSideProps() {

  const token = await axios.get(`${process.env.PRODUCTION ? process.env.PRODUCTION_URL : process.env.DEVELOPEMENT_URL}api/token`)
  const t = await token.data.toString()
  const albumDetails = await axios.get(`${process.env.PRODUCTION ? process.env.PRODUCTION_URL : process.env.DEVELOPEMENT_URL}api/album/${t}`)
  return {
    props: {
      albumDetails : albumDetails.data
    }
  }

}
  
