import { Router } from "express";
import  controller from '../controller/appController.js'
import auth from '../common/auth.js'
import {registerMail} from '../controller/mailer.js'
import {generateOTP,verifyOTP} from '../controller/appController.js'

const router = Router()



/** crud methods */

/*** post methods */
router.route('/register').post(controller.register)
router.route('/registerMail').post(registerMail) // send the email
router.route('/authenticate').post(auth.verifyUser,(req,res)=>res.end()) // authenticate user
router.route('/login').post(auth.verifyUser ,controller.login) // login in app

/**GET method */
router.route('/user/:userId').get(controller.getUserById)
router.route('/users/:username').get(controller.getUser)  // user with username
router.route('/generateOTP').get(auth.verifyUser,auth.localVariablies,generateOTP)  // generate random otp
router.route('/verifyOTP').get(auth.verifyUser,verifyOTP)  // verify generated otp
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables

/**Put methods */

router.route('/updateuser').put(controller.updateUser); // is use to update the user profile 
router.route('/resetPassword').put(auth.verifyUser,controller.resetPassword) // use the reset password



export default router