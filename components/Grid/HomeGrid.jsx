import { useRouter } from 'next/router'
import Card from "../Cards/Card"
import {useAlbum} from '../../store/ContextProvider'


export default function HomeGrid({title,isPlaylist}) {

  const router =useRouter();

  const {albumData,playlistData} = useAlbum()

  const handleClick = () =>{
    !isPlaylist ? router.push('/releases') : router.push('/playlists')
  }

   return (
    <div className='text-white relative select-none mb-4 lg:mx-8' >
      <div className="flex justify-between items-center col-span-2 pl-2 pr-2 ">
          <h1 className='text-3xl font-bold lg:pl-4'>{title}</h1>
          <div className='pr-2 flex justify-center items-center pt-1 active:text-red-500' onClick={handleClick}>
            <h3 className='text-xs font-bold md:pr-4' >VIEW ALL</h3>    
          </div>
      </div>
      <div className='grid grid-cols-2 gap-4 place-items-center pt-2 px-2 md:grid-cols-4 md:gap-4'>
        {!isPlaylist ? (
          albumData?.filter((_,key)=>{
            return(key > 0 && key < 9) 
          }).map((items,index)=><Card key={items?.id} itemKey={index+1} image={items?.images[1]?.url} title={items?.name} artist={items?.artists?.map((items)=>items?.name)} genre={items?.genre}/>)
          ) : (
            playlistData?.map((items,index)=><Card isPlaylist  Linkto={items[1]?.linkTo?.url} key={index} image={items[1]?.url} title={items[0]?.text} artits={''}/>)
          )
        }
      </div>
    </div>
  )
}
