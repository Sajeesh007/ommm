import { google } from "googleapis";

export default async function handler(req,res){

  const date = new Date()
  const data = req.body.data

  const body = {
    email : data.email,
    artist : data.artist,
    song: data.song,
    link: data.link,
    instagram : data.instagram,
    message: data.message
  }

  const val = Object.values(body)

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
  
  // //drive
  // const drive = google.drive({version: 'v3',auth: authToken})
  // try {
  //   const result = await drive.files.create({
  //     resource: fileMetadata,
  //     media: {
  //       mimeType: 'image/jpeg'}
  //   })
  // } catch (e) {
    
  // }

  //sheets
  const sheets = google.sheets({version: 'v4',auth: authToken})
  const values = [[date.toUTCString(),...val]]
  try{
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId:'1Wv_PiHdrdWSC2FE_D2WpHVDlcMKythd6P7pzSMhNChY',
      range:'Sheet1!A1',
      valueInputOption: 'RAW',
      resource: {
        values
      }
    })
    res.status(200).json(result) 
  }catch(e){
    console.log(e);
  } 
  
}
