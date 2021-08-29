import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {useAlbum} from '../../store/ContextProvider'
import { useForm } from "react-hook-form";
import axios from 'axios';


export default function Login() {

  const router = useRouter()

  const {setLogin,login} = useAlbum()
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState({state : false, count : 0})

  useEffect(() => {
    error.count > 1 && router.push('/')
  }, [error,router])

  const onSubmit = (data)=>{
    axios.post('/api/admin',{
      data: data.firstName
    }).then((res)=>{
      res.data === true ? setLogin(true) : setError((prev)=>({state : true, count : prev.count+1}))
    }).catch((e)=>{
      console.log(e);
    })
  }
  
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
          <label htmlFor='firstName'>Name</label>
          <input {...register("firstName",{ required: true })} className='focus:outline-none'/>
          {error.state && <p>Unauthorsied Access, only {2 - error.count} remaining</p> }
          <input type="submit" className='bg-white rounded-sm px-4 py-1 mt-2 cursor-pointer'/>
        </form>
    </div>
  )
}
