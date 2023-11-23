import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken'
import UserModel from "../model/userModel.js"

const hashPassword = async(password)=>{
    let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND))
    let hash = await bcrypt.hash(password,salt)
    return hash
}
const hashCompare = async(password,hash)=>{
    return await bcrypt.compare(password,hash)
}
const createToken = async(payload)=>{
    const token = await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
        
    })
    console.log(token)
    return token
}
const decodeToken = async(token)=>{
    const payload = await jwt.decode(token)
    return payload
}
const validate = async(req,res,next)=>{
    let token = req.headers.authorization ?.split(" ")[1]
    if(token ){
        let payload = await decodeToken(token)
        let currentTime = Math.round((+new Date)/1000)

        if(currentTime<payload.exp){
           next()
           
        }
        else{
            res.status(400).send({
                message: "Token Expired"
            })
        }
        
    }
    else{
        res.status(400).send({message:"No TOken Found"})
    }
    //console.log(token)    
}

const localVariablies=async(req, res, next)=>{
        req.app.local ={
            OTP : null,
            resetSession : false
        }
        next()
}
const verifyUser= async(req, res, next)=>{
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;
        console.log(username)
        // check the user existance

        let exist = await UserModel.findOne({ username });
        
        if(!exist) res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        console.log(error)
         res.status(404).send({ error: "Authentication Error"});
    }
}

export default {
    hashPassword,
    hashCompare,
    createToken,
    decodeToken,
    validate,
    localVariablies,
    verifyUser

}