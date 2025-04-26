import express, { json } from"express";
import cors from"cors"; 
import taskRouter from "./routes/task.route.js"
import dotenv from "dotenv"
import connect from "./db/connect.js";
dotenv.config()
const app =  express()
const PORT  = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use('/api/task',taskRouter)


app.listen(PORT,()=>{
    connect()
    console.log("app is working",PORT)
})