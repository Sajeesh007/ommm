import { google } from "googleapis";

export default async function handler(_,res){

  const auth  = await google.auth.getClient({scopes: ['https://www.googleapis.com/auth/spreadsheets','https://www.googleapis.com/auth/drive']})
  const sheets = google.sheets({version: 'v4',auth})

  const values = [['gf','sd','sdtser']]

  const result = await sheets.spreadsheets.values.append({
    spreadsheetId:'1Wv_PiHdrdWSC2FE_D2WpHVDlcMKythd6P7pzSMhNChY',
    range:'Sheet1!A1',
    valueInputOption: 'RAW',
    resource: {
      values
    }
  })
  
  res.status(200).json(result) 
  
}
