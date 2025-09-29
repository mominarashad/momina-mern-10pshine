const express = require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const authRouter=require('./Routes/AuthRoutes')
require('dotenv').config()
require('./Models/db')

const app=express()
const port=process.env.port || 3000;


app.get('/',(req,res)=>{
    res.send("Billi bht acha bacha hai !")
})
 
app.use(bodyparser.json())
app.use(cors())
app.use('/auth',authRouter)
app.listen(port,"localhost",()=>{
    console.log(`Server running at http://localhost:${port}`)
})

module.exports = app;