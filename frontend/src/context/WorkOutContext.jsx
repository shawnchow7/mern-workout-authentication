// // in this file where we make our context and context provider component

// import { createContext, useReducer } from "react";

// // CREATE THE CONTEXT (like creating a storage box)
// export const WorkoutContext = createContext()

// //PROVIDER COMPONENT (wraps your app and provides data to all children)
// // this is children props not the same as regular prop, children props is between the props itself
// // children is basically the <app /> component
// export const WorkoutsContextProvider = ({children}) => {

//     const workoutsReducer = (state,action) => {
//         switch(action.type){
//             case 'SET_WORKOUTS': 
//                 return {workouts: action.payload}

//             case 'CREATE_WORKOUT':
//                 return{
//                     workouts: [action.payload, ...(state.workouts || [])]
//                     //                            ↑ Safety check: if null, use empty array
//                 }
//             default:
//                 return state
//         }
//     }

//     const [state,dispatch] = useReducer(workoutsReducer, {workouts:null})


//     return (
//         // the value is so that it is available to other components to access the state and the dispatch action
//         //children in this case is the <app /> component
//         <WorkoutContext.Provider value={{...state,dispatch}}>
//             {children}
//         </WorkoutContext.Provider>
//     )
// }




// //first step is to create the context
// //2nd step is to create the context provider

import { createContext } from "react";
import { useReducer } from "react";

//1st step is to create the context

export const WorkOutContext = createContext()

export const WorkoutsContextProvider = ({children}) => {

    //4th step is to construct the reducer
    //willl take state which is the current state
    // and the action which is object that has type and payload
    const workoutReducer = (state,action) => {
        switch(action.type){
            case 'SET_WORKOUTS':
                return {
                    workouts: action.payload
                }
            case 'CREATE_WORKOUT':
                return {
                    workouts: [action.payload, ...(state.workouts || [])]
                }
            
            case 'DELETE_WORKOUT':
                return{
                    workouts: state.workouts.filter((workout) => (workout._id!==action.payload._id))
                }
            
            case 'UPDATE_WORKOUT':
                return {
                    workouts: state.workouts.map((workout) => 
                        workout._id === action.payload._id ? action.payload : workout
                    )
                }
            default:
                return state  // Always return current state for unknown actions
        }
    }


    //3rd step is to implment the state/context so that other components can also use it
    const [state,dispatch]= useReducer(workoutReducer,{workouts:null})




    return(

        //2nd step is to wrap the entire <App /> around with the WorkOutContextProvider
        <WorkOutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkOutContext.Provider>
    )
} 
