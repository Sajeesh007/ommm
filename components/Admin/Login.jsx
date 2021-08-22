import {useAlbum} from '../../store/ContextProvider'
import { useForm } from "react-hook-form";

export default function Login() {

  const {setLogin} = useAlbum()
  const { register, handleSubmit } = useForm();

  const onSubmit = (data)=>{
    data.firstName === process.env.ADMIN_PASSWORD && setLogin(true)
  }
  
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
          <label htmlFor='firstName'>Name</label>
          <input type='password'{...register("firstName",{ required: true })} className='focus:outline-none'/>
            <input type="submit" className='bg-white rounded-sm px-4 py-1 mt-2'/>
        </form>
    </div>
  )
}
