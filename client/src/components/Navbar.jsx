import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[9999] w-full">
      
      {/* TOP INFO BAR */}
      <div className="hidden md:flex justify-between items-center bg-green-900 text-white text-sm px-6 py-2">
        <span><i class="fa-solid fa-leaf"></i> Landscaping & Nursery Experts</span>
        <div className="flex gap-6">
          <span><i class="fa-solid fa-location-dot"></i> Pune</span>
          <span><i class="fa-solid fa-phone"></i> 9767671968</span>
          <span><i class="fa-solid fa-clock"></i> Mon–Sat: 9AM–8PM</span>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-700 text-white flex items-center justify-center rounded font-bold">
              <i class="fa-solid fa-leaf"></i> 
            </div>
            <Link to="/"><span className="text-xl font-extrabold text-green-800">
              Janai Landscape Services
            </span></Link>
          </div>

          {/* DESKTOP MENU */}
          
          <ul className="hidden md:flex gap-8 font-semibold text-green-800">
            
           <Link to="/"> <li className="hover:text-lime-600 cursor-pointer">Home</li></Link>

            {/* DROPDOWN */}
            <li className="relative group cursor-pointer">
              <div className="flex items-center gap-1 hover:text-lime-600">
                Services <ChevronDown size={16} />
              </div>

              {/* IMPORTANT: absolute + z-index */}
              <ul className="absolute left-0 top-full mt-3 w-48 bg-white shadow-xl rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition z-[9999]">
                <li className="px-4 py-2 hover:bg-lime-100">Garden Design</li>
                <li className="px-4 py-2 hover:bg-lime-100">Nursery Plants</li>
                <li className="px-4 py-2 hover:bg-lime-100">Lawn Care</li>
                <li className="px-4 py-2 hover:bg-lime-100">Irrigation</li>
              </ul>
            </li>

            <li className="hover:text-lime-600 cursor-pointer">Gallery</li>
            <li className="hover:text-lime-600 cursor-pointer">Blog</li>
          <Link to="/about"><li className="hover:text-lime-600 cursor-pointer">About</li></Link>  
            <li className="hover:text-lime-600 cursor-pointer">Contact</li>
          </ul>

          {/* CTA */}
          <button className="hidden md:block bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full">
            Get Quote
          </button>

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
            <div>Home</div>
            <div>Services</div>
            <div>Gallery</div>
            <div>Blog</div>
            <div>About</div>
            <div>Contact</div>
          </div>
        )}
      </nav>
    </header>
  );
}
