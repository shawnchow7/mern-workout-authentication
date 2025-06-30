import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors';

import workoutRoutes from './routes/workoutsRoutes.js'
import userRoutes from './routes/usersRoutes.js'

dotenv.config()
const port  = process.env.PORT



//start the app
const app = express()

app.use(cors()); // Allow all origins by default

//middleware
app.use(express.json()) //to parse incoming JSON requests ==> basically it reads the body of the request and converts it to JSON
app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/users',userRoutes)

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //start the server only after the connection is established
        app.listen(port, () => {
            console.log('connected to db and listening on port', port)
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    })


