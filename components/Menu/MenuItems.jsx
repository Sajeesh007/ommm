import Link from 'next/link'

import { FiSearch } from "react-icons/fi";
import {useAlbum} from '../../store/ContextProvider'
import { albumSearch,accessToken,fetchAlbum } from '../../utils/helper';
import SearchGrid from '../Grid/SearchGrid';

export default function MenuItems() {

  const {prismicRef,setPrismicRef,searchAlbumData, setSearchAlbumData} = useAlbum()

  const handleChange = async (e) => {
    const search = e.target.value

    if(!prismicRef){
      const ref = await accessToken()
      setPrismicRef(ref)
    }

    setSearchAlbumData(null)

    if(search.length  > 2 && search.length  !== 0){
      const {id,genre} =  await albumSearch(prismicRef,search)
      if(id.length !== 0){
        const albumDetails = await fetchAlbum(id,genre)
        setSearchAlbumData(albumDetails)
      }
    }
  }

  return (
    <>
      <div className="flex flex-col items-center pt-4 space-y-3 text-white text-xl font-base 
      lg:flex-row lg:space-x-3 lg:space-y-0 lg:pt-0 lg:pr-4 uppercase">
        <Link href='/'>
          <a>
            Home
          </a>
        </Link>

        <Link href='/releases'>
          <a>
            Releases
          </a>
        </Link>

        <Link href='/playlists'>
          <a>
            Playlists
          </a>
        </Link>
        <Link href='/submissions/demo'>
          <a>
            Submission
          </a>
        </Link>
        <Link href='/about'>
          <a>
            About
          </a>
        </Link>
        <div className='relative flex justify-center items-center lg:hidden'>
          <input className='search-input' placeholder='Search for songs, artists or genres' onChange={handleChange}/>
          <FiSearch className='absolute left-2'/>
        </div>
        { searchAlbumData && screen.width < 1024 && <SearchGrid/> }
      </div>     
    </>
  )
}
