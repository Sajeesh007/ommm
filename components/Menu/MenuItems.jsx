import { useRouter } from 'next/router';
import Link from 'next/link'

import { FiSearch } from "react-icons/fi";
import {useAlbum, useAuth, useOther,useModel} from '../../store/ContextProvider'
import { albumSearch,accessToken,fetchAlbum } from '../../utils/helper';
import SearchGrid from '../Grid/SearchGrid';

export default function MenuItems() {

  const {authUserLogined} = useAuth()
  const {setModel} = useModel()

  const {prismicRef,setPrismicRef,searchAlbumData, setSearchAlbumData} = useAlbum()
  const {setMenuHidden} = useOther()

  const handleChange = async (e) => {
    const search = e.target.value

    if(!prismicRef){
      const ref = await accessToken()
      setPrismicRef(ref)
    }

    if (search.length  === 0) {
      setSearchAlbumData(null)
    }

    if(search.length  > 2 && search.length  !== 0){
      const {id,genre} =  await albumSearch(prismicRef,search)
      if(id.length !== 0){
        const albumDetails = await fetchAlbum(id,genre)
        setSearchAlbumData(albumDetails)

      }
    }
  }

  //artist sigin
  const handleClick = ()=>{
    setMenuHidden(false)
    !authUserLogined && setModel(true)
  }

  //paths 
  const paths = [{name :'Home', path :'/'},{name: 'Releases',path: '/releases'},{name: 'Playlists',path: '/playlists'},{name: 'Submission',path: '/submissions/demo'},{name :'About',path:'/about'}]

  return (
    <>
      <div className="flex flex-col items-center pt-4 space-y-3 text-white text-xl font-base lg:flex-row lg:space-x-3 lg:space-y-0 lg:pt-0 lg:pr-4 ">

        {paths.map((items)=>(
          <div key={items.name}>
            <Link href={items.path}>
              <a>
                {items.name}
              </a>
            </Link>
          </div>
        ))}
        
        {/* artist signin */}
        <div className='border border-red-600 hover:bg-red-600 px-2 py-0.5 rounded-lg filter drop-shadow-lg cursor-pointer' onClick={handleClick}>
          {authUserLogined ? 'Dashboard' : 'Artist Login'}
        </div>

        {/* search bar */}
        <div className='relative flex justify-center items-center lg:hidden'>
          <input className='search-input' placeholder='Search for songs, artists or genres' onChange={handleChange}/>
          <FiSearch className='absolute left-2'/>
        </div>
        { searchAlbumData && screen.width < 1024 && <SearchGrid/> }
      </div>     
    </>
  )
}
