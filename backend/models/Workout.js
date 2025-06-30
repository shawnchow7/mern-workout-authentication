import mongoose from "mongoose";

const Schema = mongoose.Schema; // Schema is a function that helps to create a schema of any type


//schema is just to define the structure of the document

const workoutSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
}, {timestamps:true})


//model is to apply the schema to a model, then the model can be used to interact with that collection which stores the docments
// what is does is that it will create a collection called workouts in the databse and can use the model called Workout to interact with that collectio
const Workout = mongoose.model("Workout", workoutSchema)

//export the model so that it can be used in other files
export default Workout;