import NextCors from 'nextjs-cors';
const axios = require('axios');

export default async function handler(req, res) {

    await NextCors(req, res, {
        methods: ['GET', 'POST'],
        origin: '*',
     });

      await axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECERET, 'binary').toString('base64'),//btoa(spotify.ClientId + ':' + spotify.ClientSecret)  
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
      }).then((tokenResponse) =>{
        res.status(200).json(tokenResponse.data.access_token)
      }).catch(err=>{      
        console.error(err);
      })
        
  }

