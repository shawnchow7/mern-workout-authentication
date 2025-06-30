import { useWorkOutContext } from "../hooks/useWorkOutContext"
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutCard = (props) => {

    const {dispatch}= useWorkOutContext()
    const {user}= useAuthContext()
    const workout = props.workout

    //originally editing is false
    const [isEditing, setIsEditing] = useState(false)

    //to store the original data
    const [editData, setEditData] = useState({
        title: workout.title,
        reps: workout.reps,
        load: workout.load
    })

    const handleDelete = async (e,id) => {

        //to prevent the default action of the button
        e.preventDefault()  

        //check if there is even a user
        if(!user){
            return
        }
        const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${user.token}`}
        })

        const json = await response.json()

        //check if the response is okay
        if(response.ok){
            dispatch({type:'DELETE_WORKOUT', payload:json})
        }
    
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        
        console.log('Updating workout with data:', editData)
        console.log('Workout ID:', workout._id)
        
        const response = await fetch(`http://localhost:8000/api/workouts/${workout._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editData)
        })

        const json = await response.json()
        console.log('Response:', response.ok, json)

        if(response.ok){
            dispatch({type:'UPDATE_WORKOUT', payload:json})
            setIsEditing(false) // Exit edit mode
        } else {
            console.error('Update failed:', json)
        }
    }

    const handleInputChange = (e) => {
        console.log('Input changed:', e.target.name, '=', e.target.value)
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="workout-details">
            {isEditing ? (
                // EDIT MODE - Show input fields
                <>
                    <input 
                        type="text" 
                        name="title" 
                        value={editData.title} 
                        onChange={handleInputChange}
                        placeholder="Exercise title"
                    />
                    <input 
                        type="number" 
                        name="reps" 
                        value={editData.reps} 
                        onChange={handleInputChange}
                        placeholder="Reps"
                    />
                    <input 
                        type="number" 
                        name="load" 
                        value={editData.load} 
                        onChange={handleInputChange}
                        placeholder="Load (kg)"
                    />
                    <p>{workout.createdAt}</p>
                    <button onClick={handleUpdate}>SAVE</button>
                    <button onClick={() => setIsEditing(false)}>CANCEL</button>
                </>
            ) : (
                // VIEW MODE - Show workout data
                <>
                    <h4>{workout.title}</h4>
                    <p><strong>reps: </strong>{workout.reps}</p>
                    <p><strong>load: </strong>{workout.load}</p>
                    <p>{workout.createdAt}</p>
                    <button onClick={(e)=> {handleDelete(e, workout._id)}}>DELETE</button>
                    <button onClick={() => setIsEditing(true)}>UPDATE</button>
                </>
            )}
        </div>
    )

}

export default WorkoutCard