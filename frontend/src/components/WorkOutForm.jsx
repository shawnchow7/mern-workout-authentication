import { useState } from "react"
import { useWorkOutContext } from "../hooks/useWorkOutContext"
import { useAuthContext } from "../hooks/useAuthContext"


const WorkOutForm = () => {
    const [title,setTitle]=useState('')
    const [reps,setReps]=useState('')
    const [load,setLoad]= useState('')
    const [error,setError]=useState(null)

    const {dispatch}=useWorkOutContext()
    const {user} = useAuthContext()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError("YOU MUST BE LOGGED IN")
            return
        }

        const user_id=req.user._id

        const response = await fetch('http://localhost:8000/api/workouts', {
            method:'POST',
            // need to convert first into json
            body: JSON.stringify({title,reps,load,user_id}),
            headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }

        })

        //converts the response from backend into javascript object
        const json = await response.json()

        if(!response.ok){
            setError(json.error || 'Something went wrong')
            return
        }

        // Success - clear form and error
        setTitle('')
        setReps('')
        setLoad('')
        setError(null)
        dispatch({type:'CREATE_WORKOUT', payload:json})

    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>create a work out</h3>

            <label>Title:</label>
            <input 
            placeholder="title"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}></input>

            <label>Reps:</label>
            <input 
            placeholder="Reps"
            value={reps}
            onChange={(e) => {setReps(e.target.value)}}></input>

            <label>Load:</label>
            <input 
            placeholder="Load"
            value={load}
            onChange={(e) => {setLoad(e.target.value)}}></input>


            <button>ADD Workout</button>
            {error && <div className="error">{error}</div>}
            

        </form>
    )




}


export default WorkOutForm