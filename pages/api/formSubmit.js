import { google } from "googleapis";
import formidable from "formidable";
import path from 'path'
import fs from 'fs'

export default async function handler(req,res){

  const form = formidable.IncomingForm();
  const directory = path.dirname(__dirname);
  
  form.maxFileSize = 15 * 1024 * 1024
  form.uploadDir = directory

  form.parse(req, async(err,fields,files)=>{

    console.log(fields);

    if(err){
      return res.status(400).end({
        status : 'Failed',
        message: 'Error in parsing the file'      
      })
    }

    const scopes = ['https://www.googleapis.com/auth/spreadsheets','https://www.googleapis.com/auth/drive']
  const { privateKey } = JSON.parse(process.env.GOOGLE_PRIVATE_KEY)

  //auth
  const auth = new google.auth.GoogleAuth({
    scopes: scopes,
    projectId: process.env.GOOGLE_PROJECTID,
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  })
  const authToken  = await auth.getClient()
  
  //drive
  const drive = google.drive({version: 'v3',auth: authToken})
  try {
    const result = await drive.files.create({
      resource: {
        'name': `${fields.artist} - ${fields.song}.mp3`,
        parents : ['0B03A8JFXCgyKflhBOElSNnBGSkpBeTFseUxFd0FsV3k0QS1IV2JzcDhyakxrYWZuaExKaFE']
      },
      media: {
        mimeType: 'audio/mp3',
        body: fs.createReadStream(files.file.path)}
    })

    //sheets
    const date = new Date()
    const val = Object.values(fields)
    const sheets = google.sheets({version: 'v4',auth: authToken})
    const values = [[date.toUTCString(),...val,`https://drive.google.com/file/d/${result.data.id}`]]
    try{
      const result = await sheets.spreadsheets.values.append({
        spreadsheetId:'1Wv_PiHdrdWSC2FE_D2WpHVDlcMKythd6P7pzSMhNChY',
        range:'Sheet1!A1',
        valueInputOption: 'RAW',
        resource: {
          values
        }
      })
    }catch(e){
      console.log(e);
    }
  }catch (e) {
    console.log(e);
  }
  fs.unlink(files.file.path,(e)=>{
    if(e){
      res.status(400).end({
        message:'cannot delete the file'
      })
    }
  })
  })
  res.status(200).json('Success') 
}


export const config = {
  api: {
    bodyParser: false,
  },
}