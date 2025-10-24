const express=require('express')
const bcrypt=require('bcrypt')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
const AuthRouter=require('./Routers/AuthRouter')
const NotesRouter=require('./Routers/NotesRouter')
require('dotenv').config()

port=process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(cors())
require('./Models/db')
app.get('/',(req,res)=>{
   res.send("Hello with dropped Aura!")
})
app.use('/auth',AuthRouter)
app.use('/api',NotesRouter)
app.listen(port,()=>{
    console.log(`App running successfully at http://localhost:${port}`)
})

module.exports=app;

