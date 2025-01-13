import React from 'react'
import './App.css'
import { Routes,Route} from "react-router-dom"
import Home from "./Pages/Home"
import Login from './Pages/Login'
import Main from './Pages/Main'
import SignUp from './Pages/SignUp'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element = {<Home/>} />
      <Route path = "/auth/login" element = {<Login/>}/>
      <Route path='/auth/sign-up' element = {<SignUp/>}/>
      <Route path='/flow-lytics' element = {<Main/>}/>
      </Routes> 
      <ToastContainer/>
    </>
  )
}

export default App
