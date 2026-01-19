import './App.css';
import { Home } from './Pages/Home';
import { Gallries } from './Pages/Gallaries';
import { Route, Routes } from 'react-router-dom';
import { AboutUs } from './Pages/AboutUs';
import { Service } from './Pages/Services';

function App() {
  return (
    <div className="App">
      <Routes>
    <Route path="/" element={<Home/>}></Route> 
     <Route path='/aboutUs' element={<AboutUs/>}></Route>
     <Route path="/service" element={<Service/>}></Route>
     <Route path="/blog" element={<Service/>}></Route>
     <Route path="/gallaries" element={<Gallries/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
