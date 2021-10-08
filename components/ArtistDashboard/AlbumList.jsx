import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { albumRevenue } from "../../utils/airtableHelper";
import Table from "./Table";

export default function AlbumList({catalogue,albumName,year}) {

  const [showTable, setShowTable] = useState(false)
  const [tableData, setTableData] = useState(null)

  const handleClick = async () => {
    if(!showTable){
      const data =  await albumRevenue(catalogue,year)
      setTableData(data.months)
    }
    setShowTable(!showTable)
  }

  return (
    <div className='text-white my-3 select-none mx-4 lg:mx-40'>

      <div className='bg-gray-800 text-white flex justify-between items-center h-14 '>
        <div className='flex flex-col md:flex-row md:space-x-4 items-start justify-center px-2'>
          <h4 className='text-red-600 uppercase '>#{catalogue}</h4>
          <h4 className='truncate w-44 md:w-80' >{albumName}</h4>
        </div>
        <div className='flex items-center justify-around bg-red-600 h-14 px-2 text-white hover:cursor-pointer'
          onClick={handleClick}>
          <h4>Show Report</h4>
          <FiChevronDown className='w-5 h-5'/>
        </div>
      </div>

      <div>
          {showTable && <Table months={tableData}/>}
      </div>

    </div>
  )
}
