import { useState } from "react";
import {useForm } from "react-hook-form";
import firebaseApp from "../../firebase/firebase.config";
import { collection, addDoc, getDocs, getFirestore, Timestamp } from "firebase/firestore";


export default function Dashboard() {

  const db = getFirestore(firebaseApp);

  const { register, handleSubmit } = useForm();

  const [value, setValue] = useState([])
  const [success,setSuccess] = useState('')

  const onSubmit = async (data)=> {
    setSuccess('Sending')
    try {
      const albumRef = await addDoc(collection(db, "albums"), {
        catalogue_number: data.catalogue_number, 
        album_name: data.album_name, 
        artists: data.artists, 
        genre: data.genre, 
        spotify_id: data.spotify_id.substring(31,53), 
        release_date: Timestamp.fromDate(new Date(data.release_date))
      })
      setSuccess('Success')
    } catch(e) {
      console.log(e);
      setSuccess('Error')
    }
  }

  const handleClick = async () =>{
    setSuccess('')
    setValue([])
    try {
      const querySnapshot = await getDocs(collection(db, "albums"));
      querySnapshot.forEach((doc) => {
        setValue((prevValue)=>[...prevValue,doc.data()])
      })
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
    <div className='flex sm:flex-row flex-col justify-center items-center sm:items-start'>
      <div className='flex flex-col w-80 h-screen'>

        <h1 className='text-white text-2xl text-center mt-4'>Insert Data</h1>

        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center text-white'>
          
            <div className='flex flex-col m-4'>
              <label htmlFor='catalogue_number'>Catalogue Number</label>
              <input defaultValue='OMM' {...register("catalogue_number",{ required: true })}/>
            </div>

            <div className='flex flex-col m-4'>
              <label htmlFor='album_name'>Album Name</label>
              <input {...register("album_name",{ required: true })}/>
            </div>
            
            <div className='flex flex-col m-4'>
              <label htmlFor='artists '>Artists</label>
              <input {...register("artists",{ required: true })} />
            </div>

            <div className='flex flex-col m-4'>
              <label htmlFor='genre'>Genre</label>
              <input {...register("genre",{ required: true })} />
            </div>

            <div className='flex flex-col m-4'>
              <label htmlFor='spotify_id '>Spotify Id</label>
              <input {...register("spotify_id",{ required: true })}/>
            </div>

            <div className='flex flex-col m-4'>
              <label htmlFor='release_date'>Release Date</label>
              <input {...register("release_date",{ required: true })}/>
            </div>

            <div className='flex flex-col m-4'>
              <input className='bg-red-400 px-4 py-2 cursor-pointer hover:bg-red-100 rounded-full' type="submit" />
            </div>
          </form>
          <div className='text-xl text-red-600 flex justify-center items-center'>
            <p>{success}</p>
          </div>
      </div>

      <div className='flex flex-col w-screen max-w-full justify-start items-center text-white overflow-x-auto'>
        <button className='bg-red-400 my-2 px-4 py-2 cursor-pointer rounded-full hover:bg-red-100 focus:outline-none' onClick={handleClick}>
          Get Data
        </button>
        
        <table className='table-auto'>
            <thead>
              <tr>
                <th scope='col'>
                    Id
                </th>
                <th scope='col'>
                    Catalogue Number
                </th>
                <th  scope='col'>
                    Album Name
                </th>
                <th scope='col'>
                  Artits
                </th>
                <th scope='col'>
                  Genre
                </th>
                <th scope='col'>
                  Spotify Id
                </th>
                <th scope='col'>
                  Release Date
                </th>
              </tr>
            </thead>
            {value.length > 0 && (
              <tbody>
                {value?.map((value,key) => (
                  <tr key={value.spotify_idy}>
                    <td >{key+1}</td>
                    <td >{value.catalogue_number}</td>
                    <td>{value.album_name}</td>
                    <td>{value.artists}</td>
                    <td>{value.genre}</td>
                    <td className='w-8'>{value.spotify_id.toString()}</td>
                    <td>{value.release_date.toDate().toString()}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
      </div>
    </div>
  )
}
