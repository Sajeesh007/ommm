import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import ContextProvider from '../ContextProvider'


function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-gray-900'>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
   </div> 
    )
}

export default MyApp
