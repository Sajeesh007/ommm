import { useRouter } from "next/router";
import { getAuth, signOut } from "@firebase/auth";
import firebaseApp from "../../firebase/firebase.config";

import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { TiDocumentText } from "react-icons/ti";
import { useAuth } from "../../store/ContextProvider";




export default function DashboardMenu() {

  const auth = getAuth(firebaseApp)
  const router = useRouter()

  const {setAuthUserLogined} = useAuth()

  const handleClick = ()=>{
    signOut(auth).then((_)=>{
      router.push('/')
      setAuthUserLogined(false)
    }).catch((e)=>{
      console.log(e)
    })
  }

  return (
    <div className='fixed w-screen bg-gray-800 bottom-0 h-16 z-20 flex justify-around items-center text-white
    lg:w-16 lg:h-screen lg:left-0 lg:flex-col lg:top-12'>

      <div className='flex flex-col justify-center items-center hover:text-red-600 cursor-pointer'>
        <CgProfile className='w-8 h-8'/>
        <h6 className='text-sm'>Profile</h6>
      </div>
      <div className='flex flex-col justify-center items-center hover:text-red-600 cursor-pointer'>
        <TiDocumentText className='w-8 h-8'/>
        <h6 className='text-sm'>Report</h6>
      </div>
      <div className='flex flex-col justify-center items-center hover:text-red-600 cursor-pointer' onClick={handleClick}>
        <FiLogOut className='w-8 h-8'/>
        <h6 className='text-sm'>Logout</h6>
      </div>
      
    </div>
  )
}
