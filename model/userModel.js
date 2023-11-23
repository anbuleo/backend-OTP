import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true,"The user name must be unique"],
        unique: [ true, "user Exist"]
    },
    password:{
        type: String,
        required : [true ,"please provide a password"],
        unique: false
    },
    email:{
        type:String,
        required : [true," please provide a unique email"],
        unique: true
    },
    firstName : {type: String},
    lastName : {type: String},
    mobile : {type: Number},
    address : {type: String},
    profile : {type: String}
})

const userModel = mongoose.model('user',userSchema)

export default mongoose.model.users || userModel