import {useEffect} from "react"
import ContentGrid from '../../components/Grid/ContentGrid'
import Header from '../../components/Menu/Header'
import Footer from '../../components/Menu/Footer'
import {useAlbum} from '../../store/ContextProvider'
import axios from "axios"
import ShowMore from "../../components/Grid/ShowMore"
import {albumId} from '../../utils/albums'

export default function Releases() {

  const {setAlbumData,albumData} = useAlbum()

  useEffect(() => {
    if(albumData === null){
      fetchAlbum()
    }
  }, [])

  const fetchAlbum = async() =>{
    axios.get('https://ommm-website.prismic.io/api/v2').then((accessToken)=>{
      const ref = accessToken.data.refs[0].ref
      const albumPredicates = '[at(document.type, "releases")]'
      const albumOrdering = '[my.releases.release_date desc]'
      axios.get(`https://ommm-website.prismic.io/api/v2/documents/search?ref=${ref}&q=[${albumPredicates}]&orderings=${albumOrdering}`).then((album)=>{
        const id = album.data.results.map((releases)=>releases.data.release_details[3].text)
        const genre = album.data.results.map((releases)=>releases.data.release_details[2].text)
        axios({
          method: 'post',
          url: `api/album`,
          data: {
            albumIds : `${id.join('%2C')}`
          }
        }).then((albumDetails)=>{
          albumDetails.data.albums.map((albums,id)=>albums.genre = genre[id])
          setAlbumData(albumDetails?.data?.albums) 
        }).catch((e)=>{
          console.log(e);
        })
      }).catch((e)=>{
        console.log(e);
      })
    }).catch((e)=>{
      console.log(e);
    })
  }
  

  return (
    <div>
      <Header/>
      <div className='relative text-white'>
        <h1 className="font-bold text-3xl flex justify-center">Releases</h1>
        <ContentGrid />
      </div>
      <div className='relative flex justify-center items-center mb-4'>
        <ShowMore/>
      </div>
      <Footer/>
    </div>
  )
}



