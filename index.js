const express=require('express')
const bcrypt=require('bcrypt')
const bodyParser=require('body-parser')

const path=require('path')
const AuthRouter=require('./Routers/AuthRouter')
const NotesRouter=require('./Routers/NotesRouter')
const userRouter=require('./Routers/UserRouter')
const cors=require('cors')
const app=express()
require('dotenv').config()
app.use(express.json()); // ✅ For JSON requests
app.use(express.urlencoded({ extended: true })); // ✅ For form-data without files
port=process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true, // allow cookies to be sent
}))
require('./Models/db')
app.get('/',(req,res)=>{
   res.send("Hello with dropped Aura!")
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth',AuthRouter)
app.use('/api',NotesRouter)
app.use('/user',userRouter)
app.listen(port,()=>{
    console.log(`App running successfully at http://localhost:${port}`)
})

module.exports=app;

