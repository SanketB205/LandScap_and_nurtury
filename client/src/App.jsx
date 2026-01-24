import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HOME/HomePage";
import ServicesPage from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import AddService from "./pages/Admin/AddServices";
import AdminServices from "./pages/Admin/AdminSevices";
import EditService from "./pages/Admin/EditServices";
import Navbar from "./components/Navbar";
import AboutPage from "./components/ABOUT/AboutPage";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/services/add" element={<AddService />} />
        <Route path="/admin/services/edit/:id" element={<EditService />} />
        <Route path="/about" element={<AboutPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
