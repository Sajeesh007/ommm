import {useEffect, useState} from "react"

import { fetchAlbum, albumSearch,accessToken, album } from "../../utils/helper"
import ContentGrid from '../../components/Grid/ContentGrid'
import Header from '../../components/Menu/Header'
import Footer from '../../components/Menu/Footer'
import {useAlbum} from '../../store/ContextProvider'
import ShowMore from "../../components/Grid/ShowMore"
import Skelton from '../../components/Skelton/Skelton'
import { FiSearch } from "react-icons/fi"


export default function Releases() {

  const {setAlbumData,albumData,showMore,setSearchAlbumData,prismicRef,setPrismicRef} = useAlbum()

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
    const {id, genre} = await album(ref,20,1)
    const albumDetails = await fetchAlbum(id,genre)
    setAlbumData(albumDetails)
  }

  const handleChange = async (e) => {
    const search = e.target.value

    if(!prismicRef){
      const ref = await accessToken()
      setPrismicRef(ref)
    }

    setSearchAlbumData(null)

    if(search.length  > 2 && search.length  !== 0){
      const {id,genre} =  await albumSearch(prismicRef,search)
      if(id.length !== 0){
        const albumDetails = await fetchAlbum(id,genre)
        setSearchAlbumData(albumDetails)
      }
    }
  }

  return (
    <div>
      <Header/>
      <div className='relative text-white pt-4'>
        <div className='flex justify-center xl:ml-8 lg:ml-2 lg:justify-start'>
          <h1 className="font-bold text-4xl flex justify-center">Releases</h1>
          <div className='absolute xl:right-8 lg:right-2 hidden lg:inline'>
            <input className='search-input w-72 border-2' placeholder='Search for songs, artists or genres' onChange={handleChange}/>
            <FiSearch className='absolute top-2 left-2'/>
          </div>
        </div>
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
      <div className='relative flex justify-center items-center mb-4'>
        <ShowMore/>
      </div>
      <Footer/>
    </div>
  )
}



