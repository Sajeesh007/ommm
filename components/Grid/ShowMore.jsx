import { useEffect, useState } from "react"

import {useAlbum} from '../../store/ContextProvider'
import { accessToken, album, fetchAlbum } from "../../utils/helper"

export default function ShowMore() {

  const [showMoreClickedCount, setShowMoreClickedCount] = useState(0)
  const [hideShowMore, setHideShowMore] = useState(false)

  const {setAlbumData,albumData,searchAlbumData,setShowMore} = useAlbum()

  useEffect(() => {
    searchAlbumData && setHideShowMore(true)
  }, [searchAlbumData])

  const handleClick = async () => {
    const ref = await accessToken()
    const {id, genre, currentPage, totalPages} = await album(ref,20,2)
    setShowMore({ currentPage : currentPage,clicked : true})

    if(showMoreClickedCount < totalPages - 1){
      const albumDetails = await fetchAlbum(id,genre)
      setShowMoreClickedCount((prevShowShowMoreClickedCount) => prevShowShowMoreClickedCount+1)
      setAlbumData([...albumData,...albumDetails])
      if(showMoreClickedCount + 1 === totalPages - 1){
        setHideShowMore(true)
      }
    }

  }

  return (
    <>
    {!hideShowMore &&(
      <div className='flex justify-center items-center w-32 h-10 bg-white rounded-full md:hover:cursor-pointer
      border-black border-opacity-40 backdrop-filter backdrop-blur-lg bg-opacity-10 text-white' onClick={handleClick}>
        Show More
      </div>
    )}
    </>
  )
}
