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
    axios({
      method: 'post',
      url: `api/album`,
      data: {
        albumIds : `${albumId.join('%2C')}`
      }
    }).then((albumDetails)=>{
      setAlbumData(albumDetails?.data?.albums)
    })
    .catch((e)=>{
      console.log(e);
    })
    
  }

  return (
    <div>
      <Header/>
      <div className='relative text-white'>
        <h1 className="font-bold text-3xl flex justify-center">Releases</h1>
        <ContentGrid />
      </div>
      <div className='relative flex justify-center items-center mb-4'>
        <ShowMore/>
      </div>
      <Footer/>
    </div>
  )
}



