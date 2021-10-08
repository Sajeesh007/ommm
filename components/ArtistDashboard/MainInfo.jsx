import { RiMoneyDollarCircleFill} from "react-icons/ri";

export default function MainInfo({balance}) {
  return (
    <div className='flex justify-between items-center mx-4 my-4 rounded-xl border  bg-white text-gray-900 '>
      <div className='flex flex-col justify-center items-start px-1'>
        <h2 className='text-base'>Account Balance</h2>
        <h2 className='text-base'>${balance}</h2>
      </div>
      <div className='flex flex-col justify-center items-center text-white bg-red-600 hover:cursor-pointer
        hover:bg-gray-900 rounded-r-xl'>
        <RiMoneyDollarCircleFill className='h-10 w-10'/>
        <h2 className='text-sm px-2'>Withdraw Funds</h2>
      </div>
    </div>
  )
}
