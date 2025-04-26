import  mongoose, { model } from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
       
    },
    isCompleted:{
        type:Boolean,
        default:false

    },
    createdAt:{
        type:Date,
        default:Date.now

    }

})

const Task = mongoose.model("task",taskSchema)

export default Task