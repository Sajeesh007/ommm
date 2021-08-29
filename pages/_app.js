import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import NextNprogress from 'nextjs-progressbar';
import ContextProvider from '../store/ContextProvider'
import Head from 'next/head'
import logo from '../public/logo.png'


function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-gray-900'>
        <ContextProvider>
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
        </ContextProvider>
   </div> 
    )
}

export default MyApp
