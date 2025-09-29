const joi=require('joi')
const logger=require('../utils/logger')

const SignupValidation=(req,res,next)=>{
  const scehmaValidate=joi.object({
    name:joi.string().min(4).max(20).required(),
    email:joi.string().email().required(),
    password:joi.string().min(5).max(20).required()

  })
  const {error}=scehmaValidate.validate(req.body);
  if(error){
    logger.error("Bad Request",error)
    return res.status(400)
    .json({
        message:"Bad Request",error
    })
  }
  next()
}
const LoginValidation=(req,res,next)=>{
  const scehmaValidate=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(8).max(20).required()

  })
  const {error}=scehmaValidate.validate(req.body);
  if(error){
    logger.error("Bad Request",error)
    return res.status(400)
    .json({
        message:"Bad Request",error
    })
  }
  next()
}

module.exports={
    SignupValidation,LoginValidation
}