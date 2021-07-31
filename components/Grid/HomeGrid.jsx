import { useRouter } from 'next/router'
import Card from "../Cards/Card"
import {useAlbum} from '../../ContextProvider'
import { MdNavigateNext } from "react-icons/md";
import e from 'cors';


export default function HomeGrid({title,isPlaylist}) {

  const router =useRouter();

  const {albumData} = useAlbum()
  const handleClick = (e) =>{
    e.preventDefault()
    router.push('/releases')
  }

   return (
    <div className='text-white relative my-10 select-none' >
      <div className="flex justify-between items-center col-span-2 pl-2 pr-2 ">
          <h1 className='text-3xl font-bold md:pl-4'>{title}</h1>
          <div className='pr-2 flex justify-center items-center pt-1 active:text-red-500' onClick={handleClick}>
            <h3 className='text-xs font-bold md:pr-4' >VIEW ALL</h3>    
          </div>
      </div>
        <div className='grid grid-cols-2 gap-4 place-items-center pt-2 px-2 md:grid-cols-4 md:gap-4'>
          { !isPlaylist && 
            albumData?.albums?.filter((items,key)=>{
              return(key > 0 && key < 9) 
            }).map((items,index)=><Card key={items.id} itemKey={index+1} image={items?.images[1]} title={items?.name} artist={items?.artists?.map((items)=>items?.name)}/>)
            
          }
        </div>
      </div>
  )
}
