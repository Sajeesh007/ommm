import NextCors from 'nextjs-cors';
const axios = require('axios');

export default async function handler(req, res) {

    const albumId=['7fEavxLskTWgZjnHsDjUGH','4DcyHxJVwpnXWOCfsNMqqb','4f8io18x1PpIJQIh6k0jFv','6OVQ4B8gycTANUxCmdvqtm',
    '3u8COOcmk5S0e9R7JCv192','21JcebnQCgHIw7sV6czDLN','779wHxdUQIEVIuCOJgMkbI','2gImKIah2kHHVNDDzXrvcF',
    '0dynympnEUFU2XJwhkRH13','0oVC4UUjHcOEngkUwvNLPb','60egehkeWnDfzn9AvlhqBU','1NuWVO9TzAffswu7ThTRA1',
    '0VYVWBlCGm2c4p6PcV4BSl','4uEX5yF3A8urSh0Twv75bH','04tXiXL614jVWrgnfvXazE','6GMIhtOpldA7ynekepCVcW',
    '7jSQ4LB15v3sGYft9ymwkZ','1mCbtp5yjmNs5khF6f15s1','1ep7Qam2a6RXqc3ZVFA2uN','2jHDRDQQcFtYxF2JIASzSK']

    await NextCors(req, res, {
        methods: ['GET', 'POST'],
        origin: '*',
     });
   

     await axios(`https://api.spotify.com/v1/albums?ids=${albumId.join('%2C')}`, { 
          headers: { 
            'Authorization' : `Bearer ${req.query.id}` ,
          },
          method: 'GET',
          }).then((details)=>{
            res.status(200).json(details.data) 
          }).catch(err=>{
            console.error('ii',err);
            res.status(400).end(err) 
          })   
  }

