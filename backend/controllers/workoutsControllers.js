import mongoose from "mongoose";
import Workout from "../models/Workout.js";


//to get all workouts
export const getAllWorkOuts = async (req,res) => {

    // when the user is getting work out only retrive those with his/her id
    const user_id= req.user_id

    try {
        const workouts =  await Workout.find({user_id})
        res.status(200).json(workouts)
        
    } catch (error) {
        res.status(500).json({msg:"could not retrieve all workouts"})
        
    }
}


// to create a new workout
export const createWorkOut = async (req,res) => {
    try {
        const {title,reps,load} = req.body
        
        // Add validation for required fields
        let emptyFields = []
        
        if(!title) {
            emptyFields.push('title')
        }
        if(!reps) {
            emptyFields.push('reps')
        }
        if(!load) {
            emptyFields.push('load')
        }
        
        if(emptyFields.length > 0) {
            return res.status(400).json({error: 'Please fill in all fields', emptyFields})
        }
        
        const newWorkOut= await Workout.create({title,reps,load})
        res.status(201).json(newWorkOut)
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

// to get a specific workout
export const getWorkout = async (req,res) => {
    try {
        const { id } = req.params
        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such workout"})
        }
        
        const workout = await Workout.findById(id)
        
        if (!workout) {
            return res.status(404).json({error: "No such workout"})
        }
        
        // it converts the Javascript object in workout to json
        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({msg:"could not retrieve workout"})
        
    }
}


// to update a workout
export const updateWorkout = async (req,res) => {
    try {
        const {id}= req.params
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"No such workout"})
        }

        const workout = await Workout.findByIdAndUpdate(id, {...req.body}, {new: true})

        if (!workout) {
            return res.status(404).json({error: "No such workout"})
        }

        res.status(200).json(workout)
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

// to delete a workout
export const deleteWorkout = async(req,res) => {
    try {
        const {id}= req.params

        // first check if it is a valid mongodb id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"No such workout"})
        }

        const workout = await Workout.findByIdAndDelete(id)

        if(!workout){
            return res.status(404).json({error:"No such workout"})
        }

        res.status(200).json(workout)
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}