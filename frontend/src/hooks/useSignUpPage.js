import { use, useState, } from "react";
import { useAuthContext } from "./useAuthContext";


const useSignUpPage = () => {
    
    //the states needed for usesign up page, eg loading, error..
    const [isError,setIsError]= useState(null)
    const [isLoading,setIsLoading]= useState(false)

    //need to have access to the auth state
    const {dispatch}=useAuthContext()

    //the function that is in charge for handling the fetch for signing up
    const signup =  async (email,password) => {

        //initally when user first try to login the loading is now true and no error
        setIsError(null)
        setIsLoading(true)

        //send to backend to sign up
        const response = await fetch('http://localhost:8000/api/users/signup', {
            method:'POST',
            body:JSON.stringify({email,password}),
            headers: {'Content-type': 'application/json'}
        })

        //change response to java script object
        const json = await response.json()

        //check if the response is okay
        if(!response.ok){
            //set error the the error 
            //loading back to false, as not sending any request
            setIsLoading(false)
            // look the the user controllers to see what get sends back when the signup back end sends an error
            setIsError(json.error)
        }

        //if response is okay
        if(response.ok){
            setIsError(null)
            setIsLoading(false)
            // the json is what the backend sends back, which is basically {email, token}
            dispatch({type:'LOGIN', payload:json})

            //save user to local storage, so that when user refresh the browser, the token still remains in the local storage
            // the item is called 'user' and what the the item is
            // local storage can only store json string
            localStorage.setItem('user', JSON.stringify(json))
        }

    }


    //want to return the function, and other relevant states so that when other components import can use the functions in this usehook
    return {signup, isError, isLoading}




}

export default useSignUpPage