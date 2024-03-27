import express from "express";
import { 
    registerController, 
    loginController 
} from '../controllers/authControllers.js'
 
// router Object
const router = express.Router()

//Routing
//Register || METHOD POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)

export default router