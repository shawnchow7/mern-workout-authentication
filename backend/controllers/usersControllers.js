//npm install jsonwebtoke
import jwt from 'jsonwebtoken'

//import the model so that the controller can interact with the database
import User from "../models/User.js"


//function to create the webtoken so that can use in both loginUser and signUpUser
const createToken = (_id) => {
    //function to create the encoded webtoke
    return jwt.sign({_id}, process.env.SECRET,{expiresIn: '3d'})

}

//function the login  route
export const loginUser = async (req,res) => {

    //first destruture to get email and pasword
    const {email,password}= req.body

    try {

        //call the login static function
        const user = await User.login(email,password)

        //once the user is created and save to database lets create the token
        const token = createToken(user._id)

        //send back to server 
        res.status(200).json({email,token})
        
    } catch (error) {

        res.status(400).json({error: error.message})
        
    }


}

//function for the sign up route
export const signUpUser = async (req,res) => {

    //first t0 destructure the body
    const {email, password} = req.body


    //do a try and catch
    try {
        //will return the created user
        const user = await User.signUp(email,password)

        //once the user is created and save to database lets create the token
        const token = createToken(user._id)


        res.status(200).json({email,token})
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

