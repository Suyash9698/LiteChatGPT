
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import HomePage from './Home' 
import Information from './information'
import Validation from './validation'
import Admin from './Admin'
import Update from './Updation'
import Chatbot from './Chatbot'
import Protected from './Protected'
import Profile from './Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Protected Component={HomePage}/>} /> 
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/info" element={<Protected Component={Information} />} /> 
        <Route path='/valid' element={<Protected Component={Validation} />} />
        <Route path='/admin' element={<Protected Component={Admin} />} />
        <Route path='/update' element={<Protected Component={Update} />} />
        <Route path='/profile' element={<Protected Component={Profile} />} />
         <Route path='/chat' element={<Protected Component={Chatbot} />} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
