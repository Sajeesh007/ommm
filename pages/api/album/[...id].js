import NextCors from 'nextjs-cors';
const axios = require('axios');
import {albumId} from '../../../utils/albums'

export default async function handler(req, res) {

    await NextCors(req, res, {
        methods: ['GET', 'POST'],
        origin: '*',
     });
     
    //  console.log(req.query.id.filter((item,id)=> id !== 0).join('%2C'));

     await axios(`https://api.spotify.com/v1/albums?ids=${req.query.id.filter((item,id)=> id !== 0).join('%2C')}`, { 
          headers: { 
            'Authorization' : `Bearer ${req.query.id[0]}` ,
          },
          method: 'GET',
          }).then((details)=>{
            res.status(200).json(details.data) 
          }).catch(err=>{
            res.status(400).end(err) 
          })   
  }

