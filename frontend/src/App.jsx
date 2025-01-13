import React from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import {Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import Main from './Pages/Main'
import Login from './Pages/Login'
function App() {
 

  return (
    <>
     <Routes>
    <Route path = "/" element={<Home/>}/>
    <Route  path = "/auth/sign-up" element={<SignUp/>}/>
    <Route path = "/auth/login" element={<Login/>}/>
    <Route path='/flowlytics' element = {<Main/>}/>
     </Routes>
     <ToastContainer/>
    </>
  )
}

export default App
