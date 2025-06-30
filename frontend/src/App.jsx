import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//to import pages and components
import HomePage from './pages/Homepage'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

import { useAuthContext } from './hooks/useAuthContext'

function App() {

  const {user} = useAuthContext()

  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={user ? <HomePage /> : <Navigate to="/login" />} />
            <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/" />} />
            <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to ="/"/>} />
          </Routes>

        </div>


      </BrowserRouter>


    </div>
  )



}

export default App
