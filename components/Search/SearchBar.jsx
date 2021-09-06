import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useAlbum } from "../../store/ContextProvider"
import { accessToken, albumSearch, fetchAlbum } from "../../utils/helper"

export default function SearchBar() {

  const {setSearchAlbumData,prismicRef,setPrismicRef} = useAlbum()

  const [searchValue, setSearchValue] = useState('')

  const handleChange = async (e) => {
    const search = e.target.value
    setSearchValue(search)

    if(!prismicRef){
      const ref = await accessToken()
      setPrismicRef(ref)
    }
    if (search.length  === 0) {
      setSearchAlbumData(null)
    }

    if(search.length  > 2 && search.length  !== 0){
      const {id,genre} =  await albumSearch(prismicRef,search)
      if(id.length !== 0){
        const albumDetails = await fetchAlbum(id,genre)
        setSearchAlbumData(albumDetails)
      }
    }
  }

  return (
    <div className='flex justify-center items-center pb-2'>
      <div className='flex justify-start items-center'>
        <input className='flex pl-8 text-sm text-black  rounded-xl 
          bg-white h-10 w-72 placeholder-gray-500 ring-2 ring-gray-100' 
          placeholder='Search for songs, artists or genres' value={searchValue} onChange={handleChange}/>
        <FiSearch className='absolute mb-1 ml-2 text-gray-500 w-5 h-5'/>
      </div>
    </div>
  )
}
