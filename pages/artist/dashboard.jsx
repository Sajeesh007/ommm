import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import ArtistDashboard from '../../components/ArtistDashboard/ArtistDashboard'
import Header from '../../components/Menu/Header'
import DashboardMenu from '../../components/ArtistDashboard/DashboardMenu'
import { useAuth } from '../../store/ContextProvider'


export default function Dashboard() {

  const router = useRouter()

  const {authUserLogined} = useAuth()

  useEffect(() => {
    (!authUserLogined) && router.push(`${router.asPath}?login=true`, undefined, { shallow: true })
  }, [])

  useEffect(() => {
    if(router.query.login === 'true'){
      router.push(`${router.asPath}`, undefined, { shallow: true })
    }
  }, [router.query.login])
  
  return (
    <div>
      <Header/>
      <div className='min-h-screen '>
        <DashboardMenu/>
        <div className=' lg:ml-16'>
          <div className='flex justify-center text-white '>
            <h1 className="font-bold text-4xl flex justify-center">Dashboard</h1>
          </div>
          <ArtistDashboard/>
        </div>
      </div>
    </div>
  )
}
