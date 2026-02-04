import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [open, setOpen] = useState(false);

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
              <Link to="/gallery">Gallery</Link>
            </li>
            <li className="hover:text-lime-600 transition-colors cursor-pointer">Blog</li>
            <li className="hover:text-lime-600 transition-colors cursor-pointer">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-lime-600 transition-colors cursor-pointer">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          {/* CTA */}
          <Link to="/auth"><button className="hidden md:block bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full">
            Login
          </button></Link>

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
            <div><Link to="/gallery">Gallery</Link></div>
            <div>Blog</div>
            <div><Link to="/about">About</Link></div>
            <div><Link to="/auth"><button
              className="w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition shadow-lg"
            >Login</button></Link></div>
          </div>
        )}
      </nav>
    </header>
  );
}
