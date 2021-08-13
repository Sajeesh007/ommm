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
    }catch(error){
      error = new Error('An error occurred while connecting to the database')
      error.status = 500
      error.info = { message: 'An error occurred while connecting to the database' }
      throw error
    }
      break

    case 'GET':
      try {
        const [getRows, _] = await conn.query('select * from Album ')
        res.statusCode = 200
        res.json(getRows)
      } catch (error) {
        error = new Error('An error occurred while connecting to the database')
        error.status = 500
        error.info = { message: 'An error occurred while connecting to the database' }
        throw error
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}