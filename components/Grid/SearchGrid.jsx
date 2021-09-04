import { useAlbum } from '../../store/ContextProvider'
import SearchCard from '../Cards/SearchCard'

export default function SearchGrid() {

  const {searchAlbumData} = useAlbum()
  
  return (
    <div>
      <div className='flex flex-col'>
        {
          searchAlbumData?.filter((_,key)=>{
            return(key < 5) 
          })?.map((items,index)=><SearchCard key={items?.id} itemKey={index} image={items?.images[2]?.url} title={items?.name} 
          artist={items?.artists?.map((items)=>items?.name)}/>
        )}
      </div> 
    </div>
  )
}
