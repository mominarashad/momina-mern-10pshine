const User=require('../Models/User')
const bcrypt=require('bcrypt')
const logger=require('../Utils/logger')
const jwt=require('jsonwebtoken')
const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        const user=await User.findOne({email})
    if(user){
        logger.warn(({email}),"User already exists")
        return res.status(409)
        .json({
            message:"User already exist",
            success:false
        })
    }
    const userNew= new User({name,email,password})
    userNew.password=await bcrypt.hash(password,10)
    await userNew.save()
    logger.info({email},"Account created successfully")
    res.status(201)
    .json({
        message:"Account created successfully!",
        success:true
    })
    }
    catch(err){
        logger.error("Internal server error")
        res.status(500)
        .json({
            message:"Internal server error!",
            success:false
        })
    }
}

const login=async(req,res)=>{
      try{
        const {name,email,password}=req.body;
      const user=await User.findOne({email})
      if(!user){
        logger.warn({email},"User does not exist")
        return res.status(401)
        .json({
            message:"User does not exist",
            success:false
        })
      }
      const isPassword=await bcrypt.compare(password,user.password)
      if(!isPassword){
        logger.warn("Wrong email or password")
        return res.status(401)
        .json({
            message:"Wrong email or password",
            success:false
        })
      }
      const jwt_check=jwt.sign({
        email:user.email,
        _id:user._id
      },
    process.env.JWT_Secret,
    {
        expiresIn:"24h"
    }
)
     logger.info({email},"Successfully login into the account")
     res.status(200)
     .json({
        message:"Sign in sucessfully!",
        success:true,
        token:jwt_check,
        email:user.email
     })
      }
      catch(err){
           logger.error("Internal server error")
           res.status(500)
           .json({
            message:`Bad request, ${err}`,
            success:false
           })
      }
}

module.exports={signup,login}