import { useState } from "react"
import useSignUpPage from "../hooks/useSignUpPage.js"


const SignUpPage = () => {

    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

    // ✅ CORRECT: Call hook at top level of component
    const {signup, isLoading, isError} = useSignUpPage()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Now just call the signup function
        await signup(email,password)
    }


    return (
        <form className="signUpPage" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input
             placeholder="email"
             value={email}
             onChange={(e)=> {setEmail(e.target.value)}}></input>


            <label>Password:</label>
            <input
             placeholder="password"
             value={password}
             onChange={(e)=> {setPassword(e.target.value)}}></input>

             <button disabled={isLoading}>Sign Up</button>
             {isError&& <div className="error">{isError}</div>}

        </form>
    )

}

export default SignUpPage