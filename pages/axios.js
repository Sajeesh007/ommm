import axios from "axios";


const instance = axios.create({
    baseURL: 'https://accounts.spotify.com/api/token',
    method :'POST',
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authoriztion' : 'Basic ' + btoa(clientId + ':' ClientSecret )
    },
    body :{ 
        'grant_type' : "authorization_code"
    }
  });