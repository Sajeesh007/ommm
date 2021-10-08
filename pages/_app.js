import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import logo from '../public/logo.png'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import NextNprogress from 'nextjs-progressbar';
import ContextProvider,{ModelContext} from '../store/ContextProvider'
import Head from 'next/head'
import LoginModel from '../components/Auth/LoginModel';


function MyApp({ Component, pageProps }) {

  const router = useRouter()
  
  const [model, setModel] = useState(false)

  return (
    <div className='bg-gray-900'>
      <ContextProvider>
        <ModelContext.Provider value={{
          model, setModel
        }}>
        <Head>
          <title>One Man Made Music</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta property="og:type" content="website"/>
          <meta property="og:site_name" content="One Man Made Music"/>
          <meta property="og:title" content="One Man Made Music - Music for everyone"/>
          <meta property="og:description" content="Music for everyone"/>
          <link rel = "icon" href ={logo.src} type ="image/x-icon"></link>
        </Head>

          <NextNprogress color="#ffffff"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}/>

          <Component {...pageProps} />
          { model && <LoginModel/>}

        </ModelContext.Provider>
      </ContextProvider>
   </div> 
    )
}

export default MyApp
