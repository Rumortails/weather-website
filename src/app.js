const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//neccessary for express
const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//set up handlebars and views location
// sets up handlebars - dynamic page templating
app.set("view engine", "hbs")
//makes hbs look for the hbs files in the templates folder
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

// will make the index.hbs be shown as the homepage
app.get('', (req,res)=>{
    //first parameter is the view we want to show second is and object of things we will want displayed on the page
    res.render('index',{
        title: "Weather",
        name:"Isaiah Gregory"
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: "About me",
        name:"Isaiah gregory"
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        title: "Help",
        serv1:"Cousneling",
        serv2:"Financial relief",
        name:"Isaiah gregory"
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        res.send({
            error:"You must eneter an address."
        })
    }
    else{
        
        const address = req.query.address

        geocode(address, (error,{latitude,longitude,location}={})=>{


            forecast(latitude, longitude, (error,fdata)=>{

                if(error){
                    res.send({error})
                }else{
                    res.send({
                        forecast:fdata,
                        location:location,
                        address:address
                    })
                }

            })




        })
    }

  
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
       return res.send({
            error: "You must enter a search term"
        })

    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
//* means everything else
app.get('*', (req,res)=>{
    res.render('404',{
        message:"404 Error. Page is not found. thank you. come again."
    })
})

//setups the port for the server to work on access it by typing localhost:3000 into broswer
app.listen(3000,()=>{
    console.log("server is up")
})