

export default async function handler(req,res){

  if(req.body.data === process.env.ADMIN_PASSWORD){
    res.status(200).json(true) 
  }else{
    res.status(200).json(false) 
  }

}