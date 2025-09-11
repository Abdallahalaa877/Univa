import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login/login.tsx'
import Navbar from './component/navBar.tsx'
import { Routes, Route } from "react-router-dom";
import Home from "./Home/home.tsx";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
   <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App
