import React from 'react'
import Contentgrid from '../components/Contentgrid'
import Header from '../components/Header'
import Footer from '../components/Footer'

function releases() {
  return (
    <div>
      <Header/>
      <div className='relative text-white'>
        <h1 className="font-bold text-3xl flex justify-center relative top-10">Playlists</h1>
        <Contentgrid/>
      </div>
            
      <Footer/>
    </div>
  )
}

export default releases
