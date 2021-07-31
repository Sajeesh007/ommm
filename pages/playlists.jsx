import ContentGrid from '../components/Grid/ContentGrid'
import Header from '../components/Menu/Header'
import Footer from '../components/Menu/Footer'

export default function Playlists() {
  return (
    <div>
      <Header/>
      <div className='relative text-white'>
        <h1 className="font-bold text-3xl flex justify-center relative top-10">Playlists</h1>
        <ContentGrid/>
      </div>
      <Footer/>
    </div>
  )
}
