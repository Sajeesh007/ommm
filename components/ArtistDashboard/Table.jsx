
export default function Table({months}) {
  
  return (
    <div className='flex justify-center items-center lg:justify-start mb-8'>
      <table className='table-auto bg-gray-800 rounded-b-xl md:w-screen'>
        <thead>
          <tr>
            <th scope='col' >
              Month
            </th>
            <th scope='col'>
              Net Revenue
            </th>
            <th scope='col'>
              Artist&apos;s Share
            </th>
          </tr>
        </thead>
        <tbody>
          {months.map((items,index)=>(
          <tr key={index}>
            <td className='bg-red-600'>{items[0]}</td>
            <td>${items[1]}</td>
            <td>${(items[1]*60/100).toFixed(5)}</td>
          </tr>
          ))}  
        </tbody>
        <tfoot>
          <tr>
            <th scope='col' >
              Total
            </th>
            <th scope='col' >
            ${months.reduce((total,item)=>(total+item[1]),0).toFixed(5)}
            </th>
            <th scope='col' >
              ${months.reduce((total,item)=>(total+item[1]*60/100),0).toFixed(5)}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
