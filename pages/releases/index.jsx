import {useEffect} from "react"
import ContentGrid from '../../components/Grid/ContentGrid'
import Header from '../../components/Menu/Header'
import Footer from '../../components/Menu/Footer'
import {useAlbum} from '../../ContextProvider'
import axios from "axios"

export default function Releases() {

  const {setAlbumData,albumData} = useAlbum()

  
  useEffect(() => {
    if(albumData == null){
      fetchAlbum()
    }
  }, [])

  const fetchAlbum = async () =>{
    const token = await axios.get(`api/token`)
    const t = await token.data.toString()
    const albumDetails = await axios.get(`api/album/${t}`)
    setAlbumData(albumDetails.data)
  }

  return (
    <div>
      <Header/>
      <div className='relative text-white'>
        <h1 className="font-bold text-3xl flex justify-center relative top-6">Releases</h1>
        <ContentGrid />
      </div>
      <Footer/>
    </div>
  )
}



