import { useEffect, useState } from "react"

import {useAlbum} from '../../store/ContextProvider'
import { accessToken, album, fetchAlbum } from "../../utils/helper"

export default function ShowMore() {

  const {setAlbumData,albumData,searchAlbumData,showMore,setShowMore,hideShowMore, setHideShowMore,dateFilterOrder} = useAlbum()

  useEffect(() => {
    searchAlbumData && setHideShowMore(true)
  }, [searchAlbumData])

  const handleClick = async () => {
    const ref = await accessToken()
    const {id, genre, currentPage, totalPages} = await album(ref,20,showMore.clickedCount+2,dateFilterOrder)
    setShowMore((prev)=>({currentPage : currentPage, clickedCount : prev.clickedCount+1 ,clicked : true}))

    if(showMore.clickedCount < totalPages - 1){
      const albumDetails = await fetchAlbum(id,genre)
      setAlbumData([...albumData,...albumDetails])
      if(showMore.clickedCount + 1  === totalPages - 1 ){
        setHideShowMore(true)
      }
    }

  }

  return (
    <>
    {!hideShowMore && (
      <div className='flex justify-center items-center w-32 h-10 bg-white rounded-full md:hover:cursor-pointer
      border-black border-opacity-40 backdrop-filter backdrop-blur-lg bg-opacity-10 text-white' onClick={handleClick}>
        Show More
      </div>
    )}
    </>
  )
}
