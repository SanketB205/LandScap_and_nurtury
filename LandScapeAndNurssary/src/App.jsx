import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Services from './pages/Services'
import Blogs from './pages/Blogs'
import BlogDetails from './pages/BlogDetails'
import AdminBlogs from './pages/AdminBlogs'
import AddBlog from './pages/AddBlog'
import EditBlog from './pages/EditBlog'
import Gallery from './pages/Gallery'
import AdminGallery from './pages/AdminGallery'
import AddGallery from './pages/AddGallery'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Account from './pages/Account'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import ServiceDetails from './pages/ServiceDetails'
import AdminServices from './pages/AdminServices'
import AddService from './pages/AddService'
import EditService from './pages/EditService'
import { useAuth } from './context/AuthContext'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-nature-50">
      <div className="w-12 h-12 border-4 border-nature-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
  
  if (!isAuthenticated) return <Navigate to="/login" />
  
  return children
}

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth()
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-nature-50">
      <div className="w-12 h-12 border-4 border-nature-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
  
  if (!isAuthenticated || user?.role !== 'admin') return <Navigate to="/" />
  
  return children
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />

          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />

          <Route path="/order-success" element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/products" element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          } />
          <Route path="/admin/services" element={
            <AdminRoute>
              <AdminServices />
            </AdminRoute>
          } />
          <Route path="/admin/add-service" element={
            <AdminRoute>
              <AddService />
            </AdminRoute>
          } />
          <Route path="/admin/edit-service/:id" element={
            <AdminRoute>
              <EditService />
            </AdminRoute>
          } />
          <Route path="/admin/add-product" element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          } />
          <Route path="/admin/edit-product/:id" element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          } />
          <Route path="/admin/blogs" element={
            <AdminRoute>
              <AdminBlogs />
            </AdminRoute>
          } />
          <Route path="/admin/add-blog" element={
            <AdminRoute>
              <AddBlog />
            </AdminRoute>
          } />
          <Route path="/admin/edit-blog/:id" element={
            <AdminRoute>
              <EditBlog />
            </AdminRoute>
          } />
          <Route path="/admin/gallery" element={
            <AdminRoute>
              <AdminGallery />
            </AdminRoute>
          } />
          <Route path="/admin/add-gallery" element={
            <AdminRoute>
              <AddGallery />
            </AdminRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
