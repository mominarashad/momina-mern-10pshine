//only valid user can access the notes

const jwt=require('jsonwebtoken')
const User=require('../Models/User')
const logger = require('../Utils/logger')

const authMiddleware=async(req,res,next)=>{
    try{
        const authHeader=req.headers['authorization']
        if(!authHeader){
            logger.warn("No authorization header found")
            return res.status(401)
            .json({
                message:"No authorization token found",
                success:false
            })
        }
        const token=authHeader?.split(" ")[1] // mtlb authorizationheader yai dega==> bearer qxyqy68376 something to inko seprate krlo or [1] prtoken usko pkr lo
        if(!token){
            logger.warn("Token not found")
            return res.status(401)
            .json({
                message:"Token not found",
                sucess:false
            })
        }
        const verify_user=jwt.verify(token,process.env.JWT_Secret)
        const user=await User.findById(verify_user._id)

        if(!user){
            logger.warn("Invalid token user not found")
            return res.status(403)
            .json({
                message:"User not found"
            })
        }
        req.user=user
        next()
    }
    catch(err){
        logger.error("Invalid or expire token")
        res.status(403)
        .json({
            message:`Invalid or expire token ${err}`,
            success:false
        })
    }
}
module.exports=authMiddleware;