import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, LogOut, Settings, User, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  
  // Use global auth context
  const { isLoggedIn, userRole, userName, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  const handleAdminClick = () => {
    if (userRole === "admin") {
      navigate("/admin");
      setShowDropdown(false);
    }
  };

  return (
    <header className="sticky top-0 z-[9999] w-full">

      {/* TOP INFO BAR */}
      <div className="hidden md:flex justify-between items-center bg-green-900 text-white text-sm px-6 py-2">
        <span><i className="fa-solid fa-leaf"></i> Landscaping & Nursery Experts</span>
        <div className="flex gap-6">
          <span><i className="fa-solid fa-location-dot"></i> Pune</span>
          <span><i className="fa-solid fa-phone"></i> 9767671968</span>
          <span><i className="fa-solid fa-clock"></i> Mon–Sat: 9AM–8PM</span>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-700 text-white flex items-center justify-center rounded font-bold">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <Link to="/"><span className="text-xl font-extrabold text-green-800">
              Janai Landscape Services
            </span></Link>
          </div>

          {/* DESKTOP MENU */}

          <ul className="hidden md:flex items-center gap-8 font-semibold text-green-800">
            <li className="hover:text-lime-600 transition-colors cursor-pointer">
              <Link to="/">Home</Link>
            </li>

            {/* DROPDOWN - Services */}
            <li className="relative group py-5 cursor-pointer">
              <div className="flex items-center gap-1 hover:text-lime-600 transition-colors">
                Services <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
              </div>

              {/* DROPDOWN MENU */}
              <div className="absolute left-0 top-full w-56 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 invisible group-hover:visible transition-all duration-300 z-[9999] pt-2">
                <ul className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-lime-100/50">
                  <Link to="/services/garden-design">
                    <li className="px-5 py-3 hover:bg-lime-50 hover:text-green-700 transition font-medium border-b border-gray-50 last:border-0 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-green-800 rounded-full"></span>
                      Garden Design
                    </li>
                  </Link>
                  <Link to="/services/nursery-plants">
                    <li className="px-5 py-3 hover:bg-lime-50 hover:text-green-700 transition font-medium border-b border-gray-50 last:border-0 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-green-800 rounded-full"></span>
                      Nursery Plants
                    </li>
                  </Link>
                  <Link to="/services/lawn-care">
                    <li className="px-5 py-3 hover:bg-lime-50 hover:text-green-700 transition font-medium border-b border-gray-50 last:border-0 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-green-800 rounded-full"></span>
                      Lawn Care
                    </li>
                  </Link>
                  <Link to="/services/irrigation">
                    <li className="px-5 py-3 hover:bg-lime-50 hover:text-green-700 transition font-medium border-b border-gray-50 last:border-0 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-green-800 rounded-full"></span>
                      Irrigation
                    </li>
                  </Link>
                </ul>
              </div>
            </li>

            <li className="hover:text-lime-600 transition-colors cursor-pointer">
              <Link to="/products">Products</Link>
            </li>
            <li className="hover:text-lime-600 transition-colors cursor-pointer">Blog</li>
            <li className="hover:text-lime-600 transition-colors cursor-pointer">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-lime-600 transition-colors cursor-pointer">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          {/* CTA - Login or Profile */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white px-4 py-2 rounded-full transition"
                >
                  <img
                    src={`https://i.pravatar.cc/40?u=${userName}`}
                    alt={userName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-medium">👤 Profile</span>
                  <ChevronDown size={16} className={`transition-transform ${showDropdown ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200 z-[9999]">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-700 to-green-600 text-white px-4 py-3">
                      <p className="font-semibold text-sm">{userName}</p>
                      <p className="text-xs text-green-100">
                        {userRole === "admin" ? "🔐 Administrator" : "👤 User"}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {/* Admin Dashboard - Only for admins */}
                      {userRole === "admin" && (
                        <>
                          <button
                            onClick={handleAdminClick}
                            className="w-full text-left px-4 py-3 hover:bg-green-50 transition flex items-center gap-3 border-b border-gray-100"
                          >
                            <Shield size={18} className="text-green-700" />
                            <div>
                              <p className="font-medium text-gray-800 text-sm">Admin Panel</p>
                              <p className="text-xs text-gray-500">Manage dashboard</p>
                            </div>
                          </button>
                        </>
                      )}

                      {/* Profile Settings */}
                      <Link
                        to={userRole === "admin" ? "/admin/settings" : "/"}
                        onClick={() => setShowDropdown(false)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 transition flex items-center gap-3 border-b border-gray-100"
                      >
                        <Settings size={18} className="text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">Settings</p>
                          <p className="text-xs text-gray-500">Account preferences</p>
                        </div>
                      </Link>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-red-50 transition flex items-center gap-3 text-red-600"
                      >
                        <LogOut size={18} />
                        <div>
                          <p className="font-medium text-sm">Logout</p>
                          <p className="text-xs text-red-400">Sign out of your account</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link to="/auth">
              <button className="hidden md:block bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full transition">
                Login
              </button>
            </Link>
          )}

          {/* MOBILE ICON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-green-800"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-white px-6 py-4 space-y-4 font-semibold text-green-800 shadow-lg">
            <div><Link to="/">Home</Link></div>
            <div> <Link to="/services">Services</Link></div>
            <div><Link to="/products">Products</Link></div>
            <div>Blog</div>
            <div><Link to="/about">About</Link></div>

            {isLoggedIn ? (
              <>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                    <img
                      src={`https://i.pravatar.cc/40?u=${userName}`}
                      alt={userName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-sm">{userName}</p>
                      <p className="text-xs text-gray-500">
                        {userRole === "admin" ? "🔐 Admin" : "👤 User"}
                      </p>
                    </div>
                  </div>

                  {userRole === "admin" && (
                    <Link to="/admin" onClick={() => setOpen(false)}>
                      <button className="w-full bg-green-700 text-white py-2 rounded-lg mb-2 flex items-center justify-center gap-2 hover:bg-green-800 transition">
                        <Shield size={16} /> Admin Panel
                      </button>
                    </Link>
                  )}

                  <Link to={userRole === "admin" ? "/admin/settings" : "/"} onClick={() => setOpen(false)}>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                      <Settings size={16} /> Settings
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div><Link to="/auth"><button
                className="w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition shadow-lg"
              >Login</button></Link></div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
