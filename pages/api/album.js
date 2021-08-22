import NextCors from 'nextjs-cors';
const axios = require('axios');

export default async function handler(req, res) {

    await NextCors(req, res, {
        methods: ['GET', 'POST'],
        origin: '*',
     })

      await axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECERET, 'binary').toString('base64'), 
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
      }).then(async (tokenResponse) =>{
        await axios(`https://api.spotify.com/v1/albums?ids=${req.body.albumIds}`, { 
          headers: { 
            'Authorization' : `Bearer ${tokenResponse.data.access_token}` ,
          },
          method: 'GET',
          }).then((details)=>{
            res.status(200).json(details.data) 
          }).catch(err=>{
            res.status(400).end(err) 
          })
      }).catch(err=>{      
        res.status(400).end(err) 
      })
        
  }

