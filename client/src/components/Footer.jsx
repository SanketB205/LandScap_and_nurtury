import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Leaf,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#142d20] text-gray-300 pt-16 pb-8 border-t border-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-green-800/60">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-lime-500 flex items-center justify-center text-green-950 font-bold shadow-md">
                <Leaf className="w-6 h-6 text-green-950" />
              </div>
              <div>
                <span className="block text-lg font-black text-white font-serif tracking-tight">
                  Janai Landscape
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-lime-400">
                  Services & Nursery • Pune
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Pune’s premier landscape architecture, natural carpet turf, artificial grass,
              commercial sports arenas, and wholesale nursery plant supply company. Transforming
              villas, terraces, and commercial spaces across Maharashtra.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/919767671968?text=Hello%20Janai%20Landscape%20Services,%20I%20would%20like%20to%20request%20a%20site%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-lime-400 pl-2.5">
              Landscaping Services
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/landscape-design-and-planning" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> Landscape Design & 3D Planning
                </Link>
              </li>
              <li>
                <Link to="/services/garden-development-and-maintenance" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> Garden Development & Care
                </Link>
              </li>
              <li>
                <Link to="/services/natural-grass-and-artificial-turf-installation" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> Natural Grass & Artificial Turf
                </Link>
              </li>
              <li>
                <Link to="/services/sports-ground-and-sports-field-development" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> Football & Sports Ground Turf
                </Link>
              </li>
              <li>
                <Link to="/services/irrigation-systems-drip-and-sprinkler" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> Drip & Pop-Up Sprinklers
                </Link>
              </li>
              <li>
                <Link to="/services/lawn-renovation-and-maintenance" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> Lawn Aeration & Renovation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-lime-400 pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/plants" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> Nursery Plants Catalog
                </Link>
              </li>
              <li>
                <Link to="/estimator" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> Smart Cost Estimator Tool
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> Completed Projects Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> About Our Pune Team
                </Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> Request Official Quotation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-green-500" /> Contact & Site Visit Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Pune Contact & Hours */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-lime-400 pl-2.5">
              Pune Office & Nursery
            </h3>

            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
              <span>
                Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune, Maharashtra 411045
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-lime-400 shrink-0" />
              <a href="tel:+919767671968" className="hover:text-white font-semibold">
                +91 97676 71968
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-lime-400 shrink-0" />
              <a href="mailto:contact@janailandscape.com" className="hover:text-white">
                contact@janailandscape.com
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-gray-400">
              <Clock className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
              <div>
                <p>Mon–Sat: 8:30 AM – 7:30 PM</p>
                <p>Sun: 9:00 AM – 2:00 PM</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-300 transition"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>
            © {new Date().getFullYear()} Janai Landscape Services (EverGreen Landscapes & Nursery). All rights reserved.
          </p>
          <div className="flex gap-6 text-[11px]">
            <Link to="/services" className="hover:text-gray-300">Services in Pune</Link>
            <Link to="/plants" className="hover:text-gray-300">Nursery Pune</Link>
            <Link to="/estimator" className="hover:text-gray-300">Lawn Cost Calculator</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
