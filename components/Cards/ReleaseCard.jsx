/* eslint-disable @next/next/no-img-element */ //src={image}
import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import {useAlbum} from '../../store/ContextProvider'


export default function ReleaseCard({isHome}) {

  const {currentAlbum} = useAlbum()

  return (
    <div className='z-10 relative lg:flex lg:flex-start lg:ml-14 text-white'>
      <div className='flex justify-center items-center pt-4 pb-4 lg:justify-start'>
        <img className='h-1/4 w-3/4 md:h-96 md:w-96' 
        src={currentAlbum?.images[0]?.url} alt='latest release'/>
      </div>
      <div className='flex flex-col items-center justify-center pb-2 lg:pl-10 lg:items-start ' >
        <h1 className='font-poppins font-bold text-4xl  uppercase md:text-5xl' >
          {currentAlbum?.name}
        </h1>
        <h3 className='font-poppins text-lg  uppercase md:text-2xl '>
          {
            currentAlbum?.artists?.map((items)=>items?.name).length > 1 ? 
            currentAlbum?.artists?.map((items)=>items?.name).join(', ') : 
            currentAlbum?.artists?.map((items)=>items?.name).join('')
          }
        </h3>
        {!isHome && <h3 className='opacity-75 '>Released {dateFormat(currentAlbum?.release_date, 'mmmm d, yyyy')}</h3> }
      </div>
    </div>
  )
}
