import mongoose from "mongoose";
//npm install bcrypt
import bcrypt from "bcrypt";
//npm install validator
import validator from 'validator'



const Schema = mongoose.Schema

// to create the schema
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            requied:true
        }
    }
)


//static method sign up ==> so that can just use User.signup() in the controller
userSchema.statics.signUp = async function(email, password) {


    //to check if email and password are empty
    if(!email || !password){
        throw Error("please enter a email or password")
    }

    //to check if email and password are strong and valid
    if(!validator.isEmail(email)){
        throw Error("please enter a valid email")
    }

     if(!validator.isStrongPassword(password)){
        throw Error("please enter a strong password")
    }


    //fist check if the email exist
    // this refers to User model
    const exist = await this.findOne({email})

    //if such email already exists throw an error
    if(exist){
        throw Error('Email is already in use')
    }

    //if does not exist want to salt and hash the password before adding to database
    // need to install npm bcrypt

    //first to salt the password ==> basically to add additional number to the password password2g342hkdf
    const salt = await bcrypt.genSalt(10)

    //2nd step is to combine salt and password, then hash
    const hash = await bcrypt.hash(password,salt)

    //create a user document
    const user = await this.create({email, password:hash})

    //lastly return the document
    return user
}


//static method for use to login in ==> so that can use User.login() in the controller
userSchema.statics.login = async function(email,password){
    //first check if they are empty
    if(!email || !password){
        throw Error("please enter a email or password")
    }

    //first check for the email is in databse
    const user = await this.findOne({email})

    //if the email dont exist in databse
    if(!user){
        throw Error('email does not exist')
    }

    //if email exist,check if password is valid
    const match = await bcrypt.compare(password, user.password)

    //check if valid password
    if(!match){
        throw Error('password does not exist')
    }

    //if both pasword and email are valid
    return user
}

const User = mongoose.model('User', userSchema) 

export default User