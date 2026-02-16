import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HOME/HomePage";
import ServicesPage from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import AddService from "./pages/Admin/AddServices";
import AdminServices from "./pages/Admin/AdminSevices";
import EditService from "./pages/Admin/EditServices";
import AdminContacts from "./pages/Admin/AdminContacts";
import AdminSettings from "./pages/Admin/AdminSettings";
import AdminUsers from "./pages/Admin/AdminUsers";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/ABOUT/AboutPage";
import AuthPage from "./pages/Auth/AuthPage";
import ContactPage from "./pages/ContactUs/ContactPage";
import ProductsPage from "./pages/Products";
import Dashboard from "./pages/Admin/Dashboard";
import { ProtectedAdminRoute, ProtectedUserRoute } from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedAdminRoute>
              <AdminServices />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/add-service"
          element={
            <ProtectedAdminRoute>
              <AddService />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/services/edit/:id"
          element={
            <ProtectedAdminRoute>
              <EditService />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedAdminRoute>
              <AdminContacts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedAdminRoute>
              <AdminUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <AdminSettings />
            </ProtectedAdminRoute>
          }
        />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
