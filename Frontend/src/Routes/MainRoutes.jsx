import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import Home from '../Pages/Home'


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default MainRoutes