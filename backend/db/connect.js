import mongoose from "mongoose"

const connect = async()=>{
    try {
     await mongoose.connect(process.env.MONGO_URI);
    
        console.log("connection with mongodb successfull")
   
        
    } catch (error) {
        console.log("fail to connect with mongo",error)
    }
}

export default connect