// to logout the user dont need to send backend anything
// just need to 1)set the auth state back to null
// 2) remove the token from local storage



import { useAuthContext } from "./useAuthContext.js"
import { useWorkOutContext } from "./useWorkOutContext.js"

const useLogOut = () => {

    const {dispatch} = useAuthContext()
    const {dispatch: workoutDispatch} = useWorkOutContext()

    const logout = () => {
        //remove the token from local storage
        localStorage.removeItem('user')

        //set the auth state back to null
        dispatch({type:'LOGOUT'})

        //once the user logs out want to set the global state of workouts to be null
        workoutDispatch({type: 'SET_WORKOUTS', payload:[]})
    }

    return {logout}

}

export default useLogOut