import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useAlbum } from "../../store/ContextProvider";
import { accessToken, album, fetchAlbum } from "../../utils/helper";

export default function Filter() {

  const [dateFilter, setDateFilter] = useState('Latest')
  const [dateFilterClicked, setDateFilterClicked] = useState(false)

  const {setDateFilterOrder,setAlbumData,setShowMore} = useAlbum()

  const handleClick = () => {
    setDateFilterClicked(!dateFilterClicked)
  }

  const selectItem = async (item) => {
    setDateFilter(item)
    setDateFilterClicked(!dateFilterClicked)
    setShowMore({ currentPage : 1,clickedCount : 0,clicked : false})
    const order = item === 'Latest' ? 'desc' : ''
    setDateFilterOrder(order)
    const ref = await accessToken()
    const {id, genre} = await album(ref,20,1,order)
    const albumDetails = await fetchAlbum(id,genre)
    setAlbumData(albumDetails)
    
  }

  return (
    <div className='flex flex-col py-2 text-gray-500 relative justify-center items-center select-none'>
      {/* filter buttons */}
      <div className='flex justify-center items-center px-2 '>
        <div className='flex justify-between items-center px-4 h-8 rounded-xl bg-white
          ring-2 ring-gray-100 cursor-pointer'
          onClick={handleClick}>
          {dateFilter}
          <FiChevronDown className='ml-2'/>
        </div>
      </div>

      {/* Latest/Old markdown */}
      {dateFilterClicked && 
        <div className='bg-white absolute z-20 top-12 w-32 rounded-xl ring-2 ring-gray-100 shadow-lg' >
          <div className='flex flex-col py-3 px-2 space-y-1'>
            <p onClick={()=>selectItem('Latest')} className={`${dateFilter === 'Latest' ? 'text-red-500' : 'cursor-pointer' }`}>Latest</p>
            <p onClick={()=>selectItem('Old')} className={`${dateFilter === 'Old' ? 'text-red-500' : 'cursor-pointer' }`}>Old</p>
          </div>
        </div>
      }
    </div>
  )
}
