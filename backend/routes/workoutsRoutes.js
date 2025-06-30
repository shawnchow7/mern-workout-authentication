import express from 'express'
import { createWorkOut, getAllWorkOuts, getWorkout, updateWorkout, deleteWorkout } from '../controllers/workoutsControllers.js'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()

// will fire this fucntion first before the remainding ones below
router.use(requireAuth)

//to get all the workouts
router.get("/", getAllWorkOuts)

//to get a specific workout
router.get("/:id", getWorkout)

//to create a workout
router.post("/", createWorkOut)

//to update a workout
router.put("/:id",updateWorkout)

//to delete a workout
router.delete("/:id", deleteWorkout)

export default router