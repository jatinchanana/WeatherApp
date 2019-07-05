const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/f9b3732d2dc9cc1a084554f85b258afa/'+latitude+','+longitude
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }
        else if(body.error){
            callback(response.body.error,undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain.')
        }

    })
}
module.exports = forecast