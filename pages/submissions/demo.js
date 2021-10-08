import Header from '../../components/Menu/Header'
import Footer from '../../components/Menu/Footer'
import Form from '../../components/Form/Form'
//https://i.scdn.co/image/ab67616d0000b273a732c03ad4f539afbb0ebdf4

export default function demo() {

  return (
    <div className='bg-gradient-to-b from-red-300 via-red-500 to-red-700'>
      <Header/>
      <div className='flex justify-center items-center pb-2 lg:pb-0'>
        <h1 className='font-bold text-3xl text-white'>Demo Submission</h1>
      </div>
      <div className='flex flex-col items-center lg:pl-10 lg:pt-4 xl:px-48'>
        <div className='flex flex-col justify-start items-center px-12 lg:pl-0 pb-2 text-white'>
          
          <ul className='list-disc list-inside text-sm pl-4'>
            <li>
             Make sure the demo is exclusively for One Man Made Music.
            </li>
            <li>
              You can either add a mp3 or private SoundCloud links.
            </li>
            <li>
              Please don’t submit bootlegs, mash-ups or remixes. 
            </li>
          </ul>
        </div>
        <Form/>
      </div>
      

      <Footer/>
    </div>
  )
}
