import { useEffect, useState } from "react";
import { useAuth } from "../../store/ContextProvider";
import { totalBalance, revenueByMonth } from "../../utils/airtableHelper";
import { accessToken, artist} from "../../utils/helper";
import AlbumList from "./AlbumList";
import MainInfo from "./MainInfo";


export default function ArtistDashboard() {

  const [albumDetails, setAlbumDetails] = useState(null)
  const [accountBalance,setAccountBalance] = useState(null)

  useEffect(() => {
    fetchArtist()
  }, [])

  const fetchArtist = async () => {
    const ref = await accessToken()
    const album = await artist(ref,'"Cyb3r0n"')
    setAlbumDetails(album?.results) 

    const catalogue = album?.results?.map((items)=>items.catalogue)
    const releaseYear = album?.results?.map((items)=>items.release_year)
    const year = [...new Set(releaseYear)]
    let total = 0
    for (let i = 0; i < year.length; i++) {
      const b = await totalBalance(catalogue,year[i])
      total = total + b;
    }
    setAccountBalance(total)
    // const data = await revenueByMonth()

  } 
  
  return (
    <div className='flex flex-col bg-gray-900'>
      <MainInfo balance={accountBalance}/>
      <h3 className='text-white text-xl text-center my-2'>Album Wise Monthly Report</h3>
      {albumDetails?.map((items)=>
        <AlbumList key={items.catalogue} catalogue={items?.catalogue} albumName={items?.albumName} year={items?.release_year} />
      )}
     
    </div>
  )
}
