const bcrypt = require('bcrypt')
const userModel = require('../Models/users')
const jwt = require('jsonwebtoken')
const logger=require('../utils/logger')
const Secret = process.env.JWT_Secret
const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        logger.info({email},"Signup Attempt")
        const user = await userModel.findOne({ email })
        if (user) {
            logger.warn({email},"User already exists")
            return res.status(409)
            
                .json({
                    message: "User already exits"
                    , success: false
                })
        }
        const newUser = new userModel({ name, email, password })
        newUser.password = await bcrypt.hash(password, 10)
        await newUser.save()
        logger.info("Account creation successful")
        res.status(201)
            .json({
                message: "Account Created Successfully!",
                success: true
            })
    }
    catch (err) {
        logger.error("Failed to create account",err)
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            logger.warn({email},"Wrong email or password")
            return res.status(404)
                .json({
                    message: "Wrong email or password"
                    , success: false
                })
        }
        const isPassword =await bcrypt.compare(password, user.password)
        if (!isPassword) {
           // logger.warn("Wrong Password")
            return res.status(401)
                .json({
                    message: "Wrong email or password",
                    success: false
                })
        }
        const token_schema = jwt.sign({
            email: user.email,
            _id: user._id
        },
            process.env.JWT_Secret ,
            {
                expiresIn: '24h'
            })
             logger.info("Login Success!")
        res.status(200)
        
                .json({
                    message: "Login success!",
                    success: true,
                    token:token_schema,
                    email:user.email
                })


    }
    catch (err) {
        logger.error("Internal server error",err)
        res.status(500)

            .json({
                message: "Internal server error",
                success: false
            })
    }
}

module.exports={
    SignUp,Login
}