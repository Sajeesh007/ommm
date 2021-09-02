import {useEffect, useState} from "react"

import { fetchAlbum,accessToken, album } from "../../utils/helper"
import ContentGrid from '../../components/Grid/ContentGrid'
import Header from '../../components/Menu/Header'
import Footer from '../../components/Menu/Footer'
import {useAlbum} from '../../store/ContextProvider'
import ShowMore from "../../components/Grid/ShowMore"
import Skelton from '../../components/Skelton/Skelton'


export default function Releases() {

  const {setAlbumData,albumData} = useAlbum()

  const [size, setSize] = useState(320)

  useEffect(() => {
    if(albumData === null){
      fetchData()
    }
  }, [])
  
  useEffect(() => {
    screen.width > 1023 ? setSize(320) : setSize(200)
  }, [size])

  const fetchData = async () => {
    const ref = await accessToken()
    const {id, genre} = await album(ref)
    const albumDetails = await fetchAlbum(id,genre)
    setAlbumData(albumDetails)
  }

  return (
    <div>
      <Header/>
      <div className='relative text-white'>
        <h1 className="font-bold text-3xl flex justify-center">Releases</h1>
        {
          (albumData) ? (
            <ContentGrid /> 
          ) : (
            <div className='grid grid-cols-2 gap-4 place-items-center my-8 px-2 lg:grid-cols-4'>
              {[1,2,3,4,5,6,7,8].map((item)=><Skelton key={item} />) }
            </div>
        )} 
      </div>
      <div className='relative flex justify-center items-center mb-4'>
        <ShowMore/>
      </div>
      <Footer/>
    </div>
  )
}



