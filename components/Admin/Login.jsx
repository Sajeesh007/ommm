import {useAlbum} from '../../store/ContextProvider'
import { useForm } from "react-hook-form";

export default function Login() {

  const {setLogin} = useAlbum()
  const { register, handleSubmit } = useForm();

  const onSubmit = (data)=>{
    data.firstName === process.env.ADMIN_PASSWORD && setLogin(true)
  }
  
  return (
    <div>
      <div className='absolute top-96 right-96 left-96 flex justify-center items-center bg-red-400 h-16'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>Name</label>
            <input {...register("firstName",{ required: true })} className='ml-2 focus:outline-none'/>
            <input type="submit" />
        </form>
      </div>
    </div>
  )
}
