import axios from "axios"
import { useState } from "react"
import {useAlbum} from '../../store/ContextProvider'
import {albumId2} from '../../utils/albums'

export default function ShowMore() {

  const [showMoreClicked, setShowMoreClicked] = useState(0)
  const [hideShowMore, setHideShowMore] = useState(false)

  const {setAlbumData,albumData} = useAlbum()

  const handleClick = async () => {
    if(showMoreClicked<1){
    setShowMoreClicked((prevShowShowMoreClicked) => prevShowShowMoreClicked+1)
    const token = await axios.get(`api/token`)
    const albumDetails = await axios.get(`api/album/${token.data.toString()}/${albumId2.join('/')}`)
    setAlbumData([...albumData,...albumDetails.data.albums])
    if(showMoreClicked + 1 === 1){
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
