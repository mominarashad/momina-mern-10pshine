const joi=require('joi')
const logger = require('../Utils/logger')

const signupValidation=(req,res,next)=>{
    const validateSchema=joi.object({
        name:joi.string().min(4).max(20).required(),
        email:joi.string().email().required(),
        password:joi.string().min(8).max(20).required()
    })
    const {error}=validateSchema.validate(req.body)
    if (error){
        logger.error("Bad request",error)
        return res.status(400)
        .json({
            message:`Bad Request , ${error}`,
            success:false
        })
    }
    next()

}
const loginValidation=(req,res,next)=>{
    const validateSchema=joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(8).max(20).required()
    })
    const {error}=validateSchema.validate(req.body)
    if (error){
        logger.error("Bad request",error)
        return res.status(400)
        .json({
            message:`Bad Request ${error}`,
            success:false
        })
    }
    next()

}

module.exports={signupValidation,loginValidation}