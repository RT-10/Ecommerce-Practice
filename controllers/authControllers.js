import userModel from '../models/userModel.js';
import { comparedPassword, hashPassword } from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {

    try {
        const {name, email, password, phone, address} = req.body
        //validation
        if(!name){
            return res.send({message: 'Name is Required'})
        }
        if(!email){
            return res.send({message: 'Email is Required'})
        }
        if(!password){
            return res.send({message: 'Password is Required'})
        }
        if(!phone){
            return res.send({message: 'Phone Number is Required'})
        }
        if(!address){
            return res.send({message: 'Address is Required'})
        }

        //Check user
        const existingUser = await userModel.findOne({email})

        //Existing user
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: 'Already Registered this user, Please go to Login'
            })
        }

        //Register User
        const hashedPassword = await hashPassword(password)

        //Saved
        const user = new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword
        }).save()

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Register',
            error
        })
    }
}

//POST LOGIN
export const loginController = async (req,res) => {
    try {
        const {email, password} = req.body
        if(!email  || !password){
            return res.status(404).send({
                success: false,
                message: 'Invalid Username or Password',
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not Registered'
            })
        }
        const match = await comparedPassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid in Password'
            })
        }
        //Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}

//test controller
export const testController = (req,res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({error})
    }
}