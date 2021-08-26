import { BiInfoCircle,BiErrorCircle} from "react-icons/bi";

export default function Info({errors}) {
  return (
    <>
      <div className='flex items-center pt-2 text-red-500'>
        <BiInfoCircle className='h-5 w-5'/>
        <p className='pl-1'>{errors?.message}</p>
      </div>
    </>
  )
}
