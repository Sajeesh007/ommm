import Card from "./Card"
import {useAlbum} from '../ContextProvider'

export default function Contentgrid({title,viewMore,isPlaylist}) {

  const {albumData} = useAlbum()

   return (
    <div className='text-white relative my-10' >
      <div className="flex justify-between items-center col-span-2 p-4">
          <h1 className='text-4xl font-bold md:pl-16'>{title}</h1>
          {viewMore && <h3 className='text-sm' >View More</h3>}
      </div>
      {!isPlaylist && (<div className='grid grid-cols-2 gap-4 place-items-center pt-2 px-2 md:grid-cols-4 md:gap-4'>
          {albumData?.map((items,key)=><Card key={key} image={items?.images[1]} title={items?.name} artist={items?.artists[0]?.name}/>)} 
      </div>)
      }
    </div>
  )
}
