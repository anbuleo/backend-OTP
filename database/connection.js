import mongoose from "mongoose";


let connect =async()=>{
    const dbName = process.env.dbName
const dbUrl = process.env.dbUrl
try {
    mongoose.connect(`${dbUrl}/${dbName}`)
    console.log("database connected Successfully")
} catch (error) {
    console.log(error)
    
}

}

export default connect