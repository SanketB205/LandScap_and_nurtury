import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
    <Navbar/>
    <Routes>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/home' element={<Hero/>}/>
    </Routes>  
    </div>
  )
}

export default App
