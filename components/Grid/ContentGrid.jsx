import Card from "../Cards/Card"
import {useAlbum} from '../../store/ContextProvider'

export default function ContentGrid() {

  const {albumData} = useAlbum()

   return (
    <div className='text-white relative my-10 select-none'>
      <div className='grid grid-cols-2 gap-4 place-items-center pt-2 px-2 md:grid-cols-4 md:gap-4'>
        {albumData?.map((items,index)=>(
          <Card key={items.id} itemKey={index} image={items?.images[0]} title={items?.name} artist={items?.artists?.map((items)=>items?.name)}/>)
        )} 
      </div>
    </div>
  )
}
