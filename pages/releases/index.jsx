import {useEffect, useState} from "react"

import { fetchAlbum, albumSearch,accessToken, album } from "../../utils/helper"
import ContentGrid from '../../components/Grid/ContentGrid'
import Header from '../../components/Menu/Header'
import Footer from '../../components/Menu/Footer'
import {useAlbum} from '../../store/ContextProvider'
import ShowMore from "../../components/Grid/ShowMore"
import Skelton from '../../components/Skelton/Skelton'
import SearchBar from "../../components/Search/SearchBar"
import Filter from "../../components/Search/Filter"



export default function Releases() {

  const {setAlbumData,albumData,showMore, setHideShowMore} = useAlbum()

  const [size, setSize] = useState(320)

  useEffect(() => {
    if(albumData === null){
      fetchData()
    }
  }, [])
  
  useEffect(() => {
    screen.width > 1023 ? setSize(320) : setSize(200)
  }, [size])

  useEffect(() => {
    if(albumData){
      setHideShowMore(false)
      if(albumData.length > 20 )
        setHideShowMore(true)
    }
  }, [albumData])

  const fetchData = async () => {
    const ref = await accessToken()
    const {id, genre} = await album(ref,20,1,'desc')
    const albumDetails = await fetchAlbum(id,genre)
    setAlbumData(albumDetails)
  }

  return (
    <div>
      <Header/>
      <div className='relative text-white pt-4 '>

        {/* Search  & filter */}
        <div className='flex flex-col justify-center it lg:flex-row lg:justify-between px-14'>
          <SearchBar/>
          <Filter/> 
         </div> 
    
        {/* heading */}
        <div className='flex justify-center'>
          <h1 className="font-bold text-4xl flex justify-center">Releases</h1>
        </div>      

        {/* ContentGrid */}
        {
          (albumData) ? (
            <ContentGrid /> 
          ) : (
            <div className='grid grid-cols-2 gap-4 place-items-center my-8 px-2 lg:grid-cols-4'>
              {[1,2,3,4,5,6,7,8].map((item)=><Skelton key={item} />) }
            </div>
        )}
  

        {(showMore.clicked && albumData[(showMore.currentPage - 1) * 20] === undefined) &&
          <div className='grid grid-cols-2 gap-4 place-items-center my-8 px-2 lg:grid-cols-4'>
          {[1,2,3,4,5,6,7,8].map((item)=><Skelton key={item} />) }
        </div>
        }
      </div>

      {/* Showmore */}
      <div className='relative flex justify-center items-center mb-4'>
        <ShowMore/>
      </div>
      <Footer/>
    </div>
  )
}



