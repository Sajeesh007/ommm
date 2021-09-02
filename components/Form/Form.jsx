import axios from "axios";
import {useForm } from "react-hook-form";
import Info from "./Info";

export default function Form() {

  const { register,formState : { errors },handleSubmit } = useForm()


  const onSubmit = (data) => {

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('artist', data.artist_name);
    formData.append('song', data.song_name,);
    formData.append('link', data.soundcloud_url);
    formData.append('instagram', data.instagram_url);
    formData.append('message', data.message);
    formData.append('file', data.file_upload[0]);

    axios.post('/api/formSubmit',formData,{
      headers:{
       'Content-Type':'multipart/form-data'
      }
      })
  } 

  return (
    <div className='pt-2 flex flex-col items-center justify-center'>
      <h1 className='text-white text-lg col-span-4' >Drop the demo</h1>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className='flex flex-col lg:grid grid-cols-4 grid-rows-4 justify-center items-center pb-12 text-white'>
        
        <div className='mr-2'>
          <div className='form-divider'>
            <label className='flex' htmlFor='email'>Email </label>
            <input
            {...register("email",{ required: {
                value:true,
                message:'required'},
                pattern:{
                value:/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
                message: 'Please enter a valid email',}})} 
            />
            {errors.email && <Info errors={errors.email}/>}
          </div>
        </div>

        <div className='mr-2'>
          <div className='form-divider'>
            <label htmlFor='artist_name'>Artist(s) Name</label>
            <input {...register("artist_name",{ required: {
                value:true,
                message:'required'}})}/>
            {errors.artist_name && <Info errors={errors.artist_name}/>}
          </div>
          </div>
          
          <div className='form-divider'>
            <label htmlFor='song_name'>Song Name</label>
            <input {...register("song_name",{ required: {
                value:true,
                message:'required'}})}/>
            {errors.song_name && <Info errors={errors.song_name}/>}
          </div>

          <div className='form-divider'>
            <label htmlFor='instagram_url'>Instagram ID</label>
            <input {...register("instagram_url",{required: {
                value:true,
                message:'required'},
            pattern:{
              value:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/,
              message: 'Please enter a valid URL'}})}/>
            {errors.instagram_url && <Info errors={errors.instagram_url}/>}
          </div>
       
        <div className='col-span-4 lg:grid grid-cols-5'>
          <div className='col-start-2 col-end-3 flex justify-center'>
            <div className='form-divider '> 
              <label htmlFor='soundcloud_url'>Private SoundCloud URL</label>
              <input  {...register("soundcloud_url",{required: {
                  value:true,
                  message:'required'},
              pattern:{
                value:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/,
                message: 'Please enter a valid URL'}})}/>
              {errors.sound_cloud_url && <Info errors={errors.soundcloud_url}/>}
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <h1 className='text-xl'>OR</h1>
          </div>

          <div className='col-start-4 col-end-5 flex justify-center'>
            <div className='form-divider col-span-2'>
              <label htmlFor='file_upload'>Upload the MP3 file</label>
              <input className='file-upload' type='file' {...register("file_upload")}/>
              {errors.sound_cloud_url && <Info errors={errors.file_upload}/>}
            </div>
          </div>
        </div>
            
          <div className='col-span-4 flex justify-center items-center'>
            <div className='form-divider '>
              <label htmlFor='message'>Message</label>
              <textarea style={{resize:'none'}} {...register("message")} cols="30" rows="3"/>
            </div>
          </div>
        

          <div className='col-span-4 flex justify-center items-center'>
            <div className='col-span-4 flex justify-center items-center pt-8 w-80'>
              <input className='w-64 px-4 py-2 cursor-pointer border-white border 
              active:ring lg:hover:border-2 rounded-full hover:animate-pulse' type="submit" />
            </div>  
          </div>  
        </form>
    </div>
  )
}
