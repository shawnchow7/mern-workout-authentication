import { useState } from "react"
import { useAuthContext } from "./useAuthContext.js"


const useLogin = () => {

    const [isLoading,setIsLoading]= useState(false)
    const [isError,setIsError]= useState(null)
    const {dispatch} = useAuthContext()

    //function to login
    const login = async (email,password) => {

        //when first trying to login set isloading to be true and isError to be false
        setIsLoading(true)
        setIsError(false)

        //send to backend api
        const response = await fetch('http://localhost:8000/api/users/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email,password})
        })

        //change response back to javascript object
        const json = await response.json()

        //check if the response is okay
        if(!response.ok){
            setIsLoading(false)
            setIsError(json.error)
        }

        //if response is okay
        if(response.ok){
            // loading stop as , successfully stopped
            setIsLoading(false)
            // no error
            setIsError(null)
            // set the auth state, to the login in user
            dispatch({type:'LOGIN', payload:json})
            // save the email and token in local storage
            localStorage.setItem('user', JSON.stringify(json))
        }
    }

    ///return the error,loading states and the function for login==> so that other component can import those utils to use
    return {login, isLoading, isError}

}

export default useLogin