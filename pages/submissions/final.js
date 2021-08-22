import axios from "axios"

export default function final() {

  const handleClick = ()=>{
    axios.get('/api/formSubmit').then((res)=>{
      console.log(res.data);
    }).catch((e)=>{
      console.log(e);
    })
  }


  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <button className='bg-white hover:bg-gray-400 px-4 py-2' onClick={handleClick}>Submit</button>
    </div>
  )
}
