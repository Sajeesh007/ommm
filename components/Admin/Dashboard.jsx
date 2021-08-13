import axios from "axios";
import { useState } from "react";
import { set, useForm } from "react-hook-form";


export default function Dashboard() {

  const { register, handleSubmit } = useForm();

  const [value, setValue] = useState([])

  const onSubmit = async (data)=>{
    const res = await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: 'api/create',
      data :JSON.stringify({
        album : {
          catalogue_number: data.catalogue_number, 
          album_name: data.album_name, 
          artists: data.artists, 
          genre: data.genre, 
          spotify_id: data.spotify_id, 
          release_date: data.release_date
        }
      })
    });
  }

  const handleClick = async(e)=>{
    e.preventDefault()
    await axios({
      method: 'get',
      url: 'api/create',
    }).then((response)=>{
      console.log(response.data);
      setValue([response.data])
    }).catch((e)=>{
      console.log(e);
    })
  }
  
  
  return (
    <div className='flex text-black'>
      <div className='flex flex-col w-80 h-screen'>
        <h1 className='text-white text-2xl text-center mt-4'>Insert Data</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center text-black'>
            <div className='flex flex-col m-4'>
              <label htmlFor='catalogue_number'>Catalogue Number</label>
              <input {...register("catalogue_number",{ required: true })}/>
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
              <input className='bg-red-400 px-4 py-2 cursor-pointer hover:bg-red-100 rounded-full  ' type="submit" />
            </div>
          </form>
      </div>
      <div className='flex flex-col mt-8 justify-start items-center bg-green-400'>
        <button className='bg-red-400 my-2 px-4 py-2 cursor-pointer rounded-full hover:bg-red-100 focus:outline-none' onClick={handleClick}>
          Get Data
          {console.log(value.length)}
        </button>
        
        <table className='table-auto'>
            <thead>
              <tr>
                <th scope='col'>
                    #ID
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
            {value.length >0 && (
              <tbody>
                {value?.map((value,index) => (
                  <tr key={value.id}>]
                    <td >{value.id}</td>
                    <td >{value.catalogue_number}</td>
                    <td>{value.album_name}</td>
                    <td>{value.artists}</td>
                    <td>{value.genre}</td>
                    <td>{value.spotify_id}</td>
                    <td>{value.release_date}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
      </div>
    </div>
  )
}
