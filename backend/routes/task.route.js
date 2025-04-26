import express from "express"
import { completeTask, createTask, deleteTask, getTask, updateTask } from "../controller/task.Controller.js";

const route = express.Router()

route.get('/',getTask)
route.post('/create',createTask)
route.put("/update/:id",updateTask)
route.delete("/delete/:id",deleteTask)
route.put("/complete/:id",completeTask)

export default route;