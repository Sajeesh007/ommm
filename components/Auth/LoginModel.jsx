import {useForm } from "react-hook-form";
import firebaseApp from "../../firebase/firebase.config";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

import { useAuth } from "../../store/ContextProvider";
import Portal from '../Portal/Portal'
import { useRouter } from "next/router";



export default function LoginModel() {

  const { register, handleSubmit } = useForm();
  const router = useRouter()

  const {setAuthUser, setAuthUserLogined} = useAuth()

  const auth = getAuth(firebaseApp)
  

  const onSubmit = async (data)=> {
    signInWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
      const user = userCredential.user;
      setAuthUserLogined(true)
      console.log(user);
      setAuthUser({name : user.displayName, email : user.email ,emailVerified : user.emailVerified})
      router.push(`/artist/dashboard`, undefined, { shallow: true })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <Portal>
      <div className='fixed m-auto inset-0 z-100 flex justify-center items-center backdrop-filter backdrop-blur-lg min-h-screen'>
        <div className='bg-gray-900 h-80 flex flex-col items-center justify-center text-white rounded-3xl px-2 lg:h-96 lg:w-80 drop-shadow-xl shadow-2xl' >

          <div className='text-2xl text-center' >
            <h1>Login</h1>
          </div>

          <div className=''>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center text-white text-base'>
              <div className='flex flex-col m-4 '>
                <label htmlFor='email'>Email</label>
                <input {...register("email",{ required: true })}/>
              </div>
              <div className='flex flex-col m-4'>
                <label htmlFor='password'>Password</label>
                <input {...register("password",{ required: true })} type="password"/>
              </div>
              <div className='flex flex-col m-4'>
                <input className='bg-red-500 px-4 py-2 cursor-pointer hover:bg-red-100 rounded-full border-none' type="submit" />
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </Portal>
  )
}
