import React from 'react'
import { Routes, Route } from "react-router-dom";

//Pages or Components
import Header from './components/Header'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register"
import Error from "./pages/Error"
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/*" element={<Error/>} />
      </Routes>
    </div>
  )
}

export default App
