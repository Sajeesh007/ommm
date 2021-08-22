import Card from "../Cards/Card"
import {useAlbum} from '../../store/ContextProvider'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton';

export default function ContentGrid() {

  const {albumData} = useAlbum()

   return (
    <div className='text-white relative my-10 select-none'>
      <div className='grid grid-cols-2 gap-4 place-items-center pt-2 px-2 md:grid-cols-4'>
        { 
          albumData ? (
            albumData?.map((items,index)=>(
              <Card key={items.id} itemKey={index} image={items?.images[0]} title={items?.name} artist={items?.artists?.map((items)=>items?.name)}/>
              ))) : (
          [1,2,3,4,5,6,7,8].map((_,index)=>(
            <div key={index} > 
              <SkeletonTheme color="#303030" highlightColor="#404040">
                <Skeleton className='h-60 w-60'/>
                <Skeleton height={10} width={330}/>
              </SkeletonTheme>
            </div>
        )))}

      </div>
    </div>
  )
}
