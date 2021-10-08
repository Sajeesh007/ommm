import axios from "axios"


export const totalBalance = async (catalogue,year) => {
  try {
    const id = catalogue.map((items)=>`{Cat#}='${items.toUpperCase()}'`)
    const filter = id.join(',')
    const result = await axios.get(`https://api.airtable.com/v0/appD4UXU3sj2iI61V/${year}?maxRecords=60&filterByFormula=OR(${encodeURIComponent(filter)})`,{
        headers: {
          'Authorization' : 'Bearer '+ process.env.AIRTABLE_API_KEY
        },
    })
    const shares = result.data.records.filter((items)=>(items.fields.Artists.includes('Cyb3r0n'))).map((items)=>items.fields.Total_Remaining)
    const balance = shares.reduce((total,item)=>(total+item),0).toFixed(5)
    
    return parseFloat(balance)

  } catch (error) {
    console.log(error);
  }
}

export const albumRevenue = async (catalogue,releaseYear) => {
  try {
    const filter = `{Cat#}='${catalogue.toUpperCase()}'`
    const year = releaseYear

    const data = await axios.get(`https://api.airtable.com/v0/appD4UXU3sj2iI61V/${year}?maxRecords=60&filterByFormula=${encodeURIComponent(filter)}`,{
      headers: {
        'Authorization' : 'Bearer '+ process.env.AIRTABLE_API_KEY
      },
    })

    const fields = data.data.records[0].fields
    const months = Object.entries(fields).filter(([key, value]) => key.includes('January') || key.includes('February') || 
      key.includes('March') || key.includes('April') ||key.includes('May') || key.includes('June') || key.includes('July') || 
      key.includes('August') || key.includes('September')|| key.includes('October') || key.includes('November') ||  key.includes('December'))
      
    return {
      months : months,
      result : data.data.records[0].fields
    }
  } catch (error) {
    console.log(error);
  }
}




const filterMonth = (records) => {
  const titleList = new Array()
  const revenue = new Map()
  let sum = 0
  let listIndex = 0

  for (let i = 0; i < records.length; i++) {
    const title = records[i]?.fields["Track Title"]
    const earnings = records[i]?.fields["Earnings($)"]
    //checking is there a title in titlelist for first time
    titleList.length === 0 && titleList.push(title) 
    //checking if the current title is not equal to titlelist then push new title and make sum 0
    if(title !== titleList[listIndex]){
      titleList.push(title)
      sum = 0
      listIndex = listIndex + 1
    }
    //calculating total sum of each title
    for (let j = 0; j < titleList.length; j++) {
      (titleList[j] === title) && (sum = sum + earnings)
    }
    //pushing sum to the map 
    (title !== titleList[listIndex - 1]) && (revenue.set(title,sum))
  }

  // console.log(revenue);
}




export const revenueByMonth = async () => {
  try {
    // const filter = `{Cat#}='${catalogue.toUpperCase()}'`

    const data = await axios.get(`https://api.airtable.com/v0/appfYXTqcRQPx0DUP/tbl8Y1YiNQWPVX1dW?sort%5B0%5D%5Bfield%5D=Track%20Title`,{
      headers: {
        'Authorization' : 'Bearer '+ process.env.AIRTABLE_API_KEY
      },
    })

    filterMonth(data.data.records)
   
    return {
      data : data.data.records
    }
  } catch (error) {
    console.log(error);
  }
}

