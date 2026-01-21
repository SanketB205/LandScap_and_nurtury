import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HOME/HomePage";
import AllServices from "./pages/AllServices";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<AllServices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
