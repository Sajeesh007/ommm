import Link from 'next/link'

function Footer() {
  return (
    <div className="relative bg-red-600 text-white flex flex-col z-100 h-36 shadow-lg">
      <div className='flex flex-col text-base font-bold justify-center items-center py-4'>
        <div className='flex'>
          <Link href='/privacy-policy' >
            <a className='pr-4'>
              Privacy Policy
            </a>
          </Link>
          <Link href='/terms-condition' >
            <a >
              Terms &amp; Condition
            </a>
          </Link>
        </div>
        <div className='flex justify-center items-center '>
          <Link href='/contact' className='pl-10'>
            <a >
              Contact Us
            </a>
          </Link>
        </div>
      </div>
      <div className='border-b-2 flex justify-center items-center'/>
      <div className="flex text-base justify-center py-4" >
        <h1>© 2021 One Man Made Music</h1>
      </div>
    </div>
  )
}

export default Footer
