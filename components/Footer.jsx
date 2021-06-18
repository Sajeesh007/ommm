import Link from 'next/link'

function Footer() {
  return (
    <div className="bg-red-500 text-white flex flex-col">
       <div className="flex justify-center py-2" >
			 		<h1>© 2021 One Man Made Music</h1>
				</div>
				<div  className='border-b-2 min-w-2xl flex justify-center items-center'></div>
				<div className='flex justify-center py-2'>
				<Link href='/privacy-policy' >
            <a className='pr-4'>
							Privacy Policy
            </a>
          </Link>
          <Link href='/contact' className='pl-10'>
            <a className='pl-4'>
              Contact Us
            </a>
          </Link>
				</div>
				     
    </div>
  )
}

export default Footer
