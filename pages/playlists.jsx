import { useEffect } from 'react'
import Prismic from '@prismicio/client'

import ContentGrid from '../components/Grid/ContentGrid'
import Header from '../components/Menu/Header'
import Footer from '../components/Menu/Footer'
import { useAlbum } from '../store/ContextProvider'


export default function Playlists() {

  const {setPlaylistData} = useAlbum()

  useEffect(() => {
    const client = Prismic.client("https://ommm-website.prismic.io/api/v2")
    client.query( Prismic.Predicates.at('document.type', 'playlists_page')
    ).then((playlist)=>{
      const playlistDetails = Object.values(playlist?.results[0]?.data)
      setPlaylistData([playlistDetails])
    }).catch((e)=>{
      console.log(e);
    })
  

  }, [])
  return (
    <div>
      <Header/>
      <div className='relative text-white'>
        <h1 className="font-bold text-3xl flex justify-center">Playlists</h1>
        <ContentGrid isPlaylist={true}/>
      </div>
      <Footer/>
    </div>
  )
}
