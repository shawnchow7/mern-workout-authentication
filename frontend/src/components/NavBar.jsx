import { Link } from "react-router-dom"
import useLogOut from "../hooks/useLogOut.js"

// you want to user state from auth as whent the state changes
// you will want to render the navbar depending on the value of user
import {useAuthContext} from "../hooks/useAuthContext.js"

const NavBar = () => {

    const {user}=useAuthContext()



    const {logout} = useLogOut()

    const handleLogout = () => {
        logout()
    }

    return(
        <header>
            <div className="container"> {/* the div with container is for styling later */}
                <Link to = "/">
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                    
                    {/* If user is logged in (user exists), show logout button and the user email */}
                    {user && (<div>
                        <div>{user.email}</div>
                        <button onClick={handleLogout}>logout</button>
                    </div>)}

                    {/* If user is NOT logged in (user is null), show login/signup links */}
                    {!user && (<div>
                        <Link to = "/login">
                            login
                        </Link>
                        <Link to = "/signup">
                            signup
                        </Link>
                    </div>)}
        
                </nav>

            </div>
        </header>
    )
}

export default NavBar