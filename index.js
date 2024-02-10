import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connect from './database/connection.js'
import router from './router/route.js'

const app =express()
dotenv.config()
app.use(express.json({limit: '50mb'}));


app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by')

const PORT = process.env.PORT

/** HTTP GET Request */

app.get('/',(req,res)=>{
    res.status(201).json("Home GET Request")
})
app.use('/api',router)


/** Start Server */
connect().then(()=>{
    try {
        app.listen(PORT,()=>console.log(`The App is listening http://localhost:${PORT}`))
    } catch (error) {
        console.log('Cannot Connect to the server')
    }
}).catch(error=>console.log("Invalid database connection"))


