import Card from "../Cards/Card"
import {useAlbum} from '../../store/ContextProvider'


export default function ContentGrid({isPlaylist}) {

  const {albumData,playlistData,searchAlbumData} = useAlbum()
  
  return (
    <div className='text-white relative mb-6 mt-2 select-none'>
      <div className='grid grid-cols-2 gap-4 place-items-center pt-2 px-2 lg:grid-cols-4'>
        { 
          !isPlaylist ? 
            searchAlbumData === null ? (
              albumData?.map((items,index)=><Card key={items?.id} itemKey={index} image={items?.images[1]?.url} title={items?.name} artist={items?.artists?.map((items)=>items?.name)} genre={items?.genre}/>)
              ) : (
              searchAlbumData?.map((items,index)=><Card key={items?.id} itemKey={index} image={items?.images[1]?.url} title={items?.name} artist={items?.artists?.map((items)=>items?.name)} genre={items?.genre}/>)
          ) : (
            playlistData?.map((items,index)=><Card isPlaylist key={index} Linkto={items[1]?.linkTo?.url} image={items[1]?.url} title={items[0]?.text}/>)) 
        }
      </div> 
    </div>
  )
}
