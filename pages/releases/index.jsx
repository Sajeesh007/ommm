import {useEffect} from "react"
import ContentGrid from '../../components/Grid/ContentGrid'
import Header from '../../components/Menu/Header'
import Footer from '../../components/Menu/Footer'
import {useAlbum} from '../../store/ContextProvider'
import axios from "axios"
import ShowMore from "../../components/Grid/ShowMore"
import {albumId} from '../../utils/albums'

export default function Releases() {

  const {setAlbumData,albumData} = useAlbum()

  useEffect(() => {

    if(albumData === null){
      fetchAlbum()
    }
  }, [])

  const fetchAlbum = async () =>{
    const token = await axios.get(`api/token`)
    const albumDetails = await axios.get(`api/album/${token.data.toString()}/${albumId.join('/')}`)
    setAlbumData(albumDetails.data.albums)
  }

  return (
    <div>
      <Header/>
      <div className='relative text-white'>
        <h1 className="font-bold text-3xl flex justify-center relative top-6">Releases</h1>
        <ContentGrid />
      </div>
      <div className='relative flex justify-center items-center mb-4'>
        <ShowMore/>
      </div>
      <Footer/>
    </div>
  )
}



