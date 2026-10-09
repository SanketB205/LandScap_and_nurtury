import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Clock,
  MapPin,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  LogOut,
  User,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const { info } = useToast();

  const handleLogout = async () => {
    await logout();
    info("You have been logged out.");
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Services",
      path: "/services",
      hasDropdown: true,
      items: [
        { name: "Landscape Design & Planning", path: "/services/landscape-design-and-planning" },
        { name: "Garden Development & Care", path: "/services/garden-development-and-maintenance" },
        { name: "Natural & Artificial Turf", path: "/services/natural-grass-and-artificial-turf-installation" },
        { name: "Sports Ground Development", path: "/services/sports-ground-and-sports-field-development" },
        { name: "Nursery Supplies & Plants", path: "/services/nursery-plants-and-gardening-supplies" },
        { name: "Drip & Sprinkler Irrigation", path: "/services/irrigation-systems-drip-and-sprinkler" },
        { name: "Lawn Renovation", path: "/services/lawn-renovation-and-maintenance" },
      ],
    },
    { name: "Nursery Plants", path: "/plants" },
    { name: "Projects", path: "/projects" },
    { name: "Smart Estimator", path: "/estimator", badge: "Planner" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Top Bar for Pune Details */}
      <div className="bg-[#1b4332] text-green-100 text-xs py-2 px-4 sm:px-8 flex justify-between items-center border-b border-green-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-lime-400" />
            <span>Baner, Pune & All Maharashtra</span>
          </span>
          <span className="hidden md:flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-lime-400" />
            <span>Mon–Sat: 8:30 AM – 7:30 PM</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:+919767671968"
            className="flex items-center gap-1 font-semibold text-lime-300 hover:text-white transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 97676 71968</span>
          </a>
          <a
            href="https://wa.me/919767671968?text=Hello%20Janai%20Landscape%20Services,%20I%20would%20like%20to%20inquire%20about%20landscaping%20in%20Pune."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-white bg-green-700 hover:bg-green-600 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition"
          >
            <MessageCircle className="w-3 h-3 text-lime-300" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
              <span className="text-2xl">🌿</span>
            </div>
            <div>
              <span className="block text-xl font-black tracking-tight text-green-950 font-serif">
                Janai Landscape
              </span>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-green-700">
                Services & Nursery • Pune
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setServicesDropdown(true)}
                onMouseLeave={() => link.hasDropdown && setServicesDropdown(false)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 text-sm font-semibold transition py-2 ${
                    isActive(link.path)
                      ? "text-green-700 border-b-2 border-green-600"
                      : "text-gray-700 hover:text-green-700"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="bg-lime-500 text-green-950 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      {link.badge}
                    </span>
                  )}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 ml-0.5 opacity-60" />}
                </Link>

                {/* Dropdown Menu */}
                {link.hasDropdown && servicesDropdown && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fade-in z-50">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Popular Services
                    </div>
                    {link.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-green-50 hover:text-green-800 transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        to="/services"
                        className="block px-4 py-2 text-xs font-bold text-green-700 hover:underline"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/quote"
              className="bg-green-700 hover:bg-green-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-1.5"
            >
              <span>Get Free Quote</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Panel</span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                    <User className="w-3.5 h-3.5 text-green-600" />
                    <span>{user.name.split(" ")[0]}</span>
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-xs font-semibold text-green-800 hover:text-green-600 border border-green-200 hover:border-green-400 px-3.5 py-2 rounded-xl transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/quote"
              className="bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-lg"
            >
              Quote
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50 transition"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-5 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between text-base font-medium py-2 px-3 rounded-lg ${
                  isActive(link.path)
                    ? "bg-green-100 text-green-900 font-bold"
                    : "text-gray-800 hover:bg-green-50"
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="bg-lime-400 text-green-950 text-xs px-2 py-0.5 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="border-t border-gray-200 pt-3 mt-2 flex flex-col gap-2">
              <Link
                to="/quote"
                onClick={() => setIsOpen(false)}
                className="w-full bg-green-700 text-white text-center py-2.5 rounded-xl font-bold shadow text-sm"
              >
                Request a Free Quote
              </Link>

              {user ? (
                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm font-semibold text-gray-700">
                    Logged in as <span className="text-green-700">{user.name}</span>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="ml-2 inline-block bg-amber-500 text-white text-xs px-2 py-0.5 rounded font-bold"
                      >
                        Admin
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="text-xs text-red-600 font-bold hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2 border border-green-700 text-green-800 rounded-xl font-bold text-sm"
                >
                  Admin & Customer Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
