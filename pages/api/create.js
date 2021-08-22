import { PSDB } from 'planetscale-node'

const conn = new PSDB('main')

export default async function handler(req, res){ 
  const { 
    body:{
      album: {
        catalogue_number, album_name, artists, genre, spotify_id, release_date
    }},
    method
  } = req

  switch (method) {
    case 'POST':
      try {
      const [rows, fields] = await conn.query(
        `insert into Album 
        (catalogue_number, album_name, artists, genre, spotify_id, release_date) values 
        ('${catalogue_number}', '${album_name}', '${artists}','${genre}','${spotify_id}''${release_date}')`
      )
      res.statusCode = 201
      res.json({rows,fields})
    }catch(error){
      console.log(error);
    }
      break

    case 'GET':
      try {
        const [result,_] = await conn.query('select * from Album ')
        res.statusCode = 200
        res.json(result)
        console.log('hh');
      } catch (error) {
        console.log(error);
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}



// const onSubmit = async (data)=>{
//   const res = await axios({
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     url: 'api/create',
//     data :JSON.stringify({
//       album : {
//         catalogue_number: data.catalogue_number, 
//         album_name: data.album_name, 
//         artists: data.artists, 
//         genre: data.genre, 
//         spotify_id: data.spotify_id, 
//         release_date: data.release_date
//       }
//     })
//   })
//   console.log(res);
// }

// const handleClick = async(e)=>{
//   e.preventDefault()
//   await axios({
//     method: 'get',
//     url: 'api/create',
//   }).then((response)=>{
//     console.log(response.data);
//     setValue([response.data])
//   }).catch((e)=>{
//     console.log(e);
//   })
// }