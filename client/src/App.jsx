import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import HomePage from "./pages/HOME/HomePage";
import ServicesPage from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import PlantsPage from "./pages/Plants";
import SmartEstimator from "./pages/SmartEstimator";
import ProjectsPage from "./pages/Projects";
import AboutPage from "./pages/ABOUT/AboutPage";
import ContactPage from "./pages/Contact";
import QuoteRequestPage from "./pages/QuoteRequestPage";
import AuthPage from "./pages/Auth/AuthPage";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminOverview from "./pages/Admin/AdminOverview";
import AdminInquiries from "./pages/Admin/AdminInquiries";
import AdminServices from "./pages/Admin/AdminSevices";
import AddService from "./pages/Admin/AddServices";
import EditService from "./pages/Admin/EditServices";
import AdminPlants from "./pages/Admin/AdminPlants";
import AdminProjects from "./pages/Admin/AdminProjects";
import AdminQuotations from "./pages/Admin/AdminQuotations";
import AdminSettings from "./pages/Admin/AdminSettings";

// Protected Admin Route Guard
const ProtectedAdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

// Public Layout Wrapper with Navbar & Footer
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* PUBLIC WEBSITE ROUTES */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              }
            />
            <Route
              path="/services"
              element={
                <PublicLayout>
                  <ServicesPage />
                </PublicLayout>
              }
            />
            <Route
              path="/services/:slug"
              element={
                <PublicLayout>
                  <ServiceDetails />
                </PublicLayout>
              }
            />
            <Route
              path="/plants"
              element={
                <PublicLayout>
                  <PlantsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/estimator"
              element={
                <PublicLayout>
                  <SmartEstimator />
                </PublicLayout>
              }
            />
            <Route
              path="/planner"
              element={
                <PublicLayout>
                  <SmartEstimator />
                </PublicLayout>
              }
            />
            <Route
              path="/projects"
              element={
                <PublicLayout>
                  <ProjectsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <AboutPage />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <ContactPage />
                </PublicLayout>
              }
            />
            <Route
              path="/quote"
              element={
                <PublicLayout>
                  <QuoteRequestPage />
                </PublicLayout>
              }
            />
            <Route
              path="/auth"
              element={
                <PublicLayout>
                  <AuthPage />
                </PublicLayout>
              }
            />

            {/* PROTECTED ADMIN DASHBOARD ROUTES */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminOverview />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="services/add" element={<AddService />} />
              <Route path="services/edit/:id" element={<EditService />} />
              <Route path="plants" element={<AdminPlants />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="quotations" element={<AdminQuotations />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
