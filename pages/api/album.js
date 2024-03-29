import NextCors from 'nextjs-cors';
import axios from 'axios'

export default async function handler(req, res) {

  await NextCors(req, res, {
      methods: ['GET', 'POST'],
      origin: '*',
  })

  axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECERET, 'binary').toString('base64'), 
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
  }).then((tokenResponse) =>{
    axios.get(`https://api.spotify.com/v1/albums?ids=${req.body.albumIds}`, { 
      headers: { 
        'Authorization' : `Bearer ${tokenResponse.data.access_token}` ,
      }
    }).then((details)=>{
      res.status(200).json(details.data) 
    }).catch(err=>{
      console.log('error in first ',err)
      res.status(400).end(err) 
    })
  }).catch(err=>{  
    console.log(err)    
    res.status(400).end(err) 
  })     
}

