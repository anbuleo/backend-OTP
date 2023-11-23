import userModel from "../model/userModel.js"
import auth from "../common/auth.js"
import otpGenerator from "otp-generator"




/**post=>  http://localhost:8000/api/register */
const register = async(req,res)=>{

    // try {
    //     const { username, password, profile, email } = req.body;        
            
    //     // check the existing user
    //     const existUsername = new Promise((resolve, reject) => {

    //          userModel.findOne({ username }, function(err, user){
    //             console.log(user)
    //             if(err) reject(new Error(err))
    //             if(user) reject({ error : "Please use unique username"});

    //             resolve();
    //         })
    //     });

    //     // check for existing email
    //     const existEmail = new Promise((resolve, reject) => {
    //         userModel.findOne({ email }, function(err, email){
    //             if(err) reject(new Error(err))
    //             if(email) reject({ error : "Please use unique Email"});

    //             resolve();
    //         })
    //     });


    //     Promise.all([existUsername, existEmail])
    //         .then(() => {
    //             if(password){
    //                 bcrypt.hash(password, 10)
    //                     .then( hashedPassword => {
                            
    //                         const user = new userModel({
    //                             username,
    //                             password: hashedPassword,
    //                             profile: profile || '',
    //                             email
    //                         });

    //                         // return save result as a response
    //                         user.save()
    //                             .then(result => res.status(201).send({ msg: "User Register Successfully"}))
    //                             .catch(error => res.status(500).send({error}))

    //                     }).catch(error => {
    //                         console.log(error)
    //                         return res.status(500).send({
    //                             error : "Enable to hashed password"
    //                         })
    //                     })
    //             }
    //         }).catch(error => {
    //             console.log(error)
    //             return res.status(500).send({ error })
    //         })


    // } catch (error) {
    //     return res.status(500).send(error);
    // }
    try {
        let user = await userModel.findOne({email : req.body.email})
        // let userName = await userModel.findOne({username:req.body.username})
        console.log(user)
        
        if(! user){

            if(!user){
                req.body.password = await auth.hashPassword(req.body.password)
                console.log(req.body.password)
            await userModel.create(req.body)
            res.status(201).send({
                message : "the user created sucess"
            })
            return

            }else{
                res.status(400).send({
                    message: `${user.email} is already exist`
                })
            }
            return

        }else {
            res.status(400).send({
                message : `${user.username} is already taken`
            })
        }


        
        // check the existing user

        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            messsage: "error",
            error
            
        })
    }
    
}
/**post=>  http://localhost:8000/api/login */
const login = async(req,res)=>{
    try {
        let user = await userModel.findOne({username:req.body.username})
        //console.log(user)
        if(user){
            let hashCompare = await auth.hashCompare(req.body.password,user.password)
            if(hashCompare){
                let token =await auth.createToken({
                    userId : user._id,
                    uername:user.username,
                    
                    
                })
                
                res.status(200).send({
                    message: "login Successfull",
                    token
                })
            }
            else{
                res.status(400).send({
                    message: "Invaild password"
                })
            }

        }else{
            res.status(400).send({
                message:`Account with ${req.body.email} does not exists`
            })
        }

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message : 'internel server error',
            error : error.message
        })
    }
}

const getUser = async(req,res)=>{


    
    const { username } = req.params;

    try {
        // let id = Number(req.params.id)
        // console.log(id)
        let user = await userModel.findOne({username})  /*let user = await userModel.find()*/
        console.log(user)
        res.status(200).send({
            message : 'The get the user sucess',
           user /*user : user[id] */
        })
        // await userModel.create(req.body[id])
        // res.status(201).send({
        //     message : "the user created"
        // })
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message : 'internel server error',
            error : error.message
        })
    }

    // try {
        
    //     if(!username) return res.status(501).send({ error: "Invalid Username"});
    //     console.log(username)

    //      await userModel.findOne({ username }, function(err, user){
    //         console.log(user)
    //         if(err) return res.status(500).send({ err });
    //         if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

    //         /** remove password from user */
    //         // mongoose return unnecessary data with object so convert it into json
    //         const { password, ...rest } = Object.assign({}, user.toJSON());

    //         return res.status(201).send(rest);
    //     })

    // } catch (error) {
    //     return res.status(404).send({ error : "Cannot Find User Data"});
    // }
   

    // try {
    //     // let id = Number(req.params.id)
    //     // console.log(id)
    //     let user = await userModel.findOne({username})  /*let user = await userModel.find()*/
    //     console.log(user)
    //     res.status(200).send({
    //         message : 'The get the user sucess',
    //        user /*user : user[id] */
    //     })
    //     // await userModel.create(req.body[id])
    //     // res.status(201).send({
    //     //     message : "the user created"
    //     // })
        
        
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).send({
    //         message : 'internel server error',
    //         error : error.message
    //     })
    // }
}
/**Put : 
 * 
 * body:{
        firstName: '',
        address:'',
        profile:''
 }
 */

const updateUser = async(req,res)=>{
    console.log(req.body)
    // try {
        
    //     // const id = req.query.id;
    //     const  email  = req.body.email;

    //     if(email){
    //         const body = req.body;

    //         // update the data
    //         userModel.updateOne({ email : email }, body, function(err, data){
    //             if(err) throw err;

    //             return res.status(201).send({ msg : "Record Updated...!"});
    //         })

    //     }else{
    //         return res.status(401).send({ error : "User Not Found...!"});
    //     }

    // } catch (error) {
    //     return res.status(401).send({ error });
    // }
    try {

        let user = await userModel.findOne({email : req.body.email})
        if(user){
            let {username,firstName,lastName,email,password,mobile,address,profile} = req.body

            user.username = username ? username : user.username
            user.firstName = firstName ? firstName : user.firstName
            user.lastName = lastName ? lastName : user.lastName
            user.email = email ? email : user.email 
            user.password = password ? password : user.password
            user.mobile = mobile ? mobile : user.mobile
            user.address = address ? address : user.address
            user.profile = profile ? profile : user.profile

            await user.save()

            res.status(200).send({
                message : "The data feched success",
                user          
            })           

        }else{
            res.status(400).send({
                message : "Invalid user"
            })

        }        

    } catch (error) {
        console.log(error)
            res.status(500).send({
                message : 'internel server error',
                error : error.message
            })
    }
}

/**GET => http://localhost:8000/api/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}

/** GET => http://localhost:8000/api/verifyOTP */
export async function verifyOTP(req,res){
    console.log(req.app,req.app.locals.OTP)
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt( req.query.code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


/** GET => http://localhost:8000/api/createResetSession */
const createResetSession = async(req,res)=>{
    let Rsession = req.app.locals.resetSession 
    if(Rsession){
        
        res.status(201).send({flag : Rsession})
    }
    else{
    res.status(440).send({
        message: "Session expired"
    })
}
}


/**PUT => http://localhost:8000/api/restPassword */
//Update the password when we have valid session
const resetPassword = async(req,res)=>{
    try {

        if(req.app.locals.resetSession ){
           
             res.status(440).send({
                message: "Session expired",
                
            })
        }
        let {username} = req.body
       
        
        try {
            let user = await userModel.findOne({username})
            if(user){
                let {username ,password} = req.body
                password= await auth.hashPassword(req.body.password)
                user.password = password ? password : user.password
                userModel.updateOne({username : user.username},{password:req.body.password})
                req.app.locals.resetSession = false
                user.save()
                res.status(201).send({
                    message : "Record Updated",
                    user,
                })
            }else{
                res.status(404).send({
                    message:'invalid user'
                })
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message:"error occured",
                error
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message:"error occured",
            error
        })
    }
}

export default {
    register,
    login,
    getUser,
    updateUser,
    
    createResetSession,
    resetPassword
}