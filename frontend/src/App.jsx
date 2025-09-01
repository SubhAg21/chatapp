import React from 'react'
import Left from './Home/Left/Left'
import {Right} from './Home/Right/Right'
import Logout from './Components/Logout'
import LoginForm from './Components/LoginForm'
import SignupForm from './Components/SignupForm'
import { useAuth } from './context/AuthProvider'
import toast, { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router'

const App = () => {
  const [authUser, setAuthUser] = useAuth()
  console.log(authUser)
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            authUser ? (
              <div className='flex h-screen'>
                <Logout />
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"}/>
            )
          }
        />
        <Route path='/login' element={authUser?<Navigate to={"/"}/>:<LoginForm/>} />
        <Route path='/signup' element={authUser?<Navigate to={"/"}/>:<SignupForm/>} />
      </Routes>
            <Toaster />

    </>
  )
}

export default App
