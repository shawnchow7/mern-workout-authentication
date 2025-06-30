import { WorkOutContext } from "../context/WorkOutContext.jsx";
import { useContext } from "react";


export const useWorkOutContext = () => {

    //you are using the context provided by workoutContext
    // it provides whatever is provided by workoutContext
    // in this case is
    const context = useContext(WorkOutContext)

    if(!context){
        throw Error("useWorkOutContext must be used inside an WorkOutContextProvider")
    }

    return context 
}