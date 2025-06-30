import { useEffect, useState } from "react"
import { useWorkOutContext } from "../hooks/useWorkOutContext"

import WorkoutCard from "../components/WorkoutCard"
import WorkOutForm from "../components/WorkOutForm"
import { useAuthContext } from "../hooks/useAuthContext"

const HomePage = () => {

    // no longer need to use the local context state 
    // const [workouts, setWorkOuts] = useState(null)


    const {workouts, dispatch} = useWorkOutContext()

    const {user} = useAuthContext()

    

    useEffect(()=> {
        const fetchwWorkouts = async () => {
            const response = await fetch("http://localhost:8000/api/workouts",{
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            // the response is in json, therefore it needs to convert it into array of javascript object
            const data = await response.json()
            

            //if the response is okay then store it into the state
            if(response.ok){
                dispatch({type:'SET_WORKOUTS', payload: data})


                // no need to use the usestate version
                // setWorkOuts(data)
            }

        }

        //if there is a user then send then only request backend for workouts data
        if(user){
            fetchwWorkouts()
        }



 
    },[user])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=> (<WorkoutCard key={workout._id} workout={workout}/>))}
            </div>
            <WorkOutForm />
        </div>
    )
}

export default HomePage