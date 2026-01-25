import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HOME/HomePage";
import ServicesPage from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import AddService from "./pages/Admin/AddServices";
import AdminServices from "./pages/Admin/AdminSevices";
import EditService from "./pages/Admin/EditServices";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/ABOUT/AboutPage";
import AuthPage from "./pages/Auth/AuthPage";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactUs/ContactPage";

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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<AuthPage/>}/>
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
