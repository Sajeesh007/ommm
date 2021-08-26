import Header from '../../components/Menu/Header'
import Footer from '../../components/Menu/Footer'
import Form from '../../components/Form/Form'

export default function demo() {

  return (
    <div>
      <Header/>
      
      <div className='flex justify-center items-center pt-6 pb-4'>
        <h1 className='font-bold text-3xl text-white flex'>Demo Submission</h1>
      </div>

      <Form/>

      <Footer/>
    </div>
  )
}
