import NextCors from 'nextjs-cors';
import { Credentials } from "../../data/Credentials"
const axios = require('axios');

export default async function handler(req, res) {

  const albumId=['6OVQ4B8gycTANUxCmdvqtm','3u8COOcmk5S0e9R7JCv192','21JcebnQCgHIw7sV6czDLN',
  '2C779wHxdUQIEVIuCOJgMkbI','2gImKIah2kHHVNDDzXrvcF','0dynympnEUFU2XJwhkRH13',
  '0oVC4UUjHcOEngkUwvNLPb','60egehkeWnDfzn9AvlhqBU']

    await NextCors(req, res, {
        methods: ['GET', 'POST'],
        origin: '*',
     });
    const spotify = Credentials()
      await axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + Buffer.from(spotify.ClientId + ':' + spotify.ClientSecret, 'binary').toString('base64'),//btoa(spotify.ClientId + ':' + spotify.ClientSecret)  
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
      }).then((tokenResponse) =>{
        res.status(200).json(tokenResponse.data.access_token)
      }).catch(err=>{      
        console.error('hh',err);
      })
        
  }

