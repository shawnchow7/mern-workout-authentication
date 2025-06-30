import { useState } from "react"
import useLogin from '../hooks/useLogin.js'


const LoginPage = () => {

    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const {login, isError, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //so the useLogin function will go inside here
        await login(email,password)
        
    }


    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login In</h3>

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

             <button disabled={isLoading}>Login in</button>

             {isError&& <div className="error">{isError}</div>}

        </form>
    )

}

export default LoginPage