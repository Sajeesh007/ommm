import { useEffect } from 'react'
import axios from 'axios'

import ContentGrid from '../components/Grid/ContentGrid'
import Header from '../components/Menu/Header'
import Footer from '../components/Menu/Footer'
import { useAlbum } from '../store/ContextProvider'



export default function Playlists() {

  const {setPlaylistData} = useAlbum()

  useEffect(() => {
    axios.get('https://ommm-website.prismic.io/api/v2').then((accessToken)=>{
      const ref = accessToken.data.refs[0].ref
      const playlistPredicates = '[at(document.type, "playlists_page")]'
      axios.get(`https://ommm-website.prismic.io/api/v2/documents/search?ref=${ref}&q=[${playlistPredicates}]`).then((playlist)=>{
        const playlistDetails = Object.values(playlist.data.results[0].data)
        setPlaylistData([playlistDetails])
      }).catch((e)=>{
        console.log(e);
      })
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
