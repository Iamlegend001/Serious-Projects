import React from 'react'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Navbar from './components/Navbar'
import MainRoutes from './Routes/MainRoutes'

const App = () => {
  return (
    <div>
        <Navbar/>
        <MainRoutes />
    </div>

  )
}

export default App