import Image from 'next/image'
import {useAlbum} from '../ContextProvider'

function Card({image,title,artist}) {

    const {albumData} = useAlbum()
    
    return (
        <div>
            <div className='hover:cursor-pointer'>
                <Image className='md:hover:transform md:hover:scale-105 Hover:shadow-lg h-60 w-60 rounded-sm md:h-72 md:w-72'
                 src={image?.url} alt='banners' width={320} height={320}/>
            </div>
            <div className='hover:cursor-pointer hover:text-red-500 pt-2'>
                <h1 className='text-lg font-semibold md:text-xl'>{title}</h1>
                <h1 className='text-sm md:text-base' >{artist}</h1>
            </div>
        </div>
    )
}

export default Card
