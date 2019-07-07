const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
const port = process.env.port || 3000
//setup handlebars and views directory
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))
app.use(express.static(path.join(__dirname,'../public')))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Jatin Chanana'
    })
})
app.get('/about',(req,res)=>{
res.render('about',{
    title:'About',
    name:'Jatin Chanana'
})
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This page is to help you.',
        name:'Jatin Chanana'
    })
    })


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
        return res.send({
            error: error
        })
        }
        forecast(latitude,longitude, (error, forecast) => {
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecast,
                location,
                address:req.query.address
            })
          })
    })
})
app.get('/product',(req,res)=>{

    if (!req.query.search){
       return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query)
    res.send({
        products: [],
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help 404',
        message:'Help Article not found!',
        name:'Jatin Chanana'
})
})
app.get('/*',(req,res)=>{
    res.render('404',{
        title:'page 404',
        message:'404 page does not exist!',
        name:'Jatin Chanana'
})
})
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

