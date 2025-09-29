const { SignUp, Login } = require('../Controllers/AuthController');
const { LoginValidation, SignupValidation } = require('../Middleware/AuthValidation');

const router=require('express').Router();

router.post('/login',LoginValidation,Login)
router.post('/signup',SignupValidation,SignUp)

module.exports = router;