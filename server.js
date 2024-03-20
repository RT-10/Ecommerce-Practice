import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'

//Configure env
dotenv.config()

//Database Confiq
connectDB()

//Rest Object
const app = express()

//Middlewares
app.use(express.json())
app.use(morgan('dev'))

//Rest API
app.get('/', (req, res) => {
    res.send("<h1>Welcome To Ecommerce App</h1>")
})

//PORT
const PORT = process.env.PORT || 8080

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port${PORT}`.bgCyan.white)
})