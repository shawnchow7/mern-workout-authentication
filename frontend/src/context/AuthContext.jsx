// to create the context, to manage the state
import { createContext, useReducer, useEffect } from "react";

// the one that will actually provide the value to the other components
export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {


    // ✅ Auth persistence (localStorage)
    //VERY IMPT, when this component first load on screen, we want to check if there are any local storage storing the user TOken
    useEffect(()=> {
        // when this component first renders check is there is any token/users in the local storage
        const user = JSON.parse(localStorage.getItem('user'))

        //if the user value is null
        if(!user){
            dispatch({type:'LOGOUT'})
        }

        //if there is a user value in the local storage, means that a user has login in
        if(user){
            dispatch({type:'LOGIN', payload: user})
        }

    }, [])


    const authReducer = (state,action) => {
        switch(action.type){
            case 'LOGIN': return{
                user: action.payload
            }

            case 'LOGOUT': return{
                user:null
            }
            default: 
                return state
            
        }
    }


    const [state,dispatch] = useReducer(authReducer,{user:null}) 

    // everytime the state changes it will log to the console
    console.log('the auth state has changed', state)



    return (

        //children will be the app component
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}