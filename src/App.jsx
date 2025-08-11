import './App.css'
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Navbar from './Navbar'
import Hero from './Hero'
import Market from './Market';
import Chart from './Chart';
import Trade from './Trade';
function App() {
  return (
     
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path='/market' element={<Market/>}/>
        <Route path='/chart' element={<Chart/>}/>
        <Route path='/trade' element={<Trade/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
