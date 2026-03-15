import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Leaf, ShoppingCart, User, Menu, X, ChevronDown,
  LogIn, LogOut, UserCircle, Settings, Package, Heart
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Plants & Products' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const { cartCount } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()
  const accountRef = useRef(null)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile on route change
  useEffect(() => {
    setIsMobileOpen(false)
    setIsAccountOpen(false)
  }, [location])

  // Click outside for account dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-nav'
          : 'bg-white/90 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="section-wrapper">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-nature flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-primary-800 leading-tight">GreenScape</span>
              <p className="text-[10px] text-gray-500 leading-tight -mt-0.5 font-medium tracking-wide uppercase">Nursery</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `nav-link text-sm ${isActive ? 'nav-link-active text-primary-800' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl hover:bg-secondary-100 transition-colors group"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-primary-800 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-800 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-slow">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Account Dropdown */}
            <div className="relative hidden md:block" ref={accountRef}>
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center gap-1.5 p-2 pr-3 rounded-xl hover:bg-secondary-100 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-nature flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-800 transition-colors">
                  {isAuthenticated ? (user?.name || 'My Account') : 'Account'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isAccountOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 animate-fade-in">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">{user?.name || 'Welcome!'}</p>
                        <p className="text-xs text-gray-500">{user?.email || ''}</p>
                      </div>
                      <Link to="/account" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary-100 hover:text-primary-800 transition-colors">
                        <UserCircle className="w-4 h-4" /> My Profile
                      </Link>
                      {user?.role === 'admin' && (
                        <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-amber-600 hover:bg-amber-50 transition-colors font-bold">
                          <Settings className="w-4 h-4" /> Admin Panel
                        </Link>
                      )}
                      <Link to="/account?tab=orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary-100 hover:text-primary-800 transition-colors">
                        <Package className="w-4 h-4" /> My Orders
                      </Link>
                      <Link to="/account?tab=wishlist" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary-100 hover:text-primary-800 transition-colors">
                        <Heart className="w-4 h-4" /> Wishlist
                      </Link>
                      <Link to="/account?tab=settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary-100 hover:text-primary-800 transition-colors">
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={logout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary-100 hover:text-primary-800 transition-colors">
                        <LogIn className="w-4 h-4" /> Login
                      </Link>
                      <Link to="/register" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary-100 hover:text-primary-800 transition-colors">
                        <UserCircle className="w-4 h-4" /> Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Account */}
            <Link to={isAuthenticated ? "/account" : "/login"} className="md:hidden p-2.5 rounded-xl hover:bg-secondary-100 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-secondary-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen
                ? <X className="w-5 h-5 text-primary-800" />
                : <Menu className="w-5 h-5 text-gray-600" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-secondary-100 text-primary-800'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <Link
              to="/cart"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-secondary-100 hover:text-primary-800 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartCount > 0 && (
                <span className="ml-auto badge">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
