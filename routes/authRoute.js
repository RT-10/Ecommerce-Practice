import express from "express";
import { registerController } from '../controllers/authControllers.js'
 
// router Object
const router = express.Router()

//Routing
//Register || METHOD POST
router.post('/register', registerController)

export default router