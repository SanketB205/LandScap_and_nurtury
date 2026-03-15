import { Link } from 'react-router-dom'
import {
  Leaf, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube,
  ArrowRight, Send
} from 'lucide-react'

const footerLinks = {
  explore: [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Plants & Products' },
    { to: '/services', label: 'Services' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/about', label: 'About Us' },
  ],
  services: [
    { label: 'Landscaping Design' },
    { label: 'Terrace Gardens' },
    { label: 'Vertical Gardens' },
    { label: 'Garden Maintenance' },
    { label: 'Plant Consultation' },
  ],
}

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Newsletter Strip */}
      <div className="bg-gradient-nature py-10">
        <div className="section-wrapper">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-1">
                Stay Green, Stay Informed 🌿
              </h3>
              <p className="text-secondary-200 text-sm">
                Get seasonal plant tips, offers, and garden inspiration.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-72 px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white text-sm"
              />
              <button className="bg-white text-primary-800 font-semibold px-5 py-3 rounded-full hover:bg-secondary-200 transition-colors flex items-center gap-2 text-sm whitespace-nowrap">
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-14">
        <div className="section-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-display font-bold text-xl text-white">GreenScape</span>
                  <p className="text-[10px] text-secondary-300 tracking-widest uppercase">Nursery</p>
                </div>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Transform your spaces with nature's beauty. Premium plants, expert landscaping, and personalized garden design since 2010.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Explore</h4>
              <ul className="space-y-3">
                {footerLinks.explore.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/65 hover:text-white text-sm flex items-center gap-2 transition-colors group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-all group-hover:translate-x-1" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map(svc => (
                  <li key={svc.label}>
                    <span className="text-white/65 hover:text-white text-sm flex items-center gap-2 transition-colors group cursor-pointer">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-all group-hover:translate-x-1" />
                      {svc.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Get in Touch</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-secondary-300 mt-0.5 flex-shrink-0" />
                  <span className="text-white/65 text-sm">
                    42 Garden Street, Green Valley, Maharashtra 411001
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-secondary-300 flex-shrink-0" />
                  <a href="tel:+919876543210" className="text-white/65 hover:text-white text-sm transition-colors">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-secondary-300 flex-shrink-0" />
                  <a href="mailto:hello@greenscapenursery.com" className="text-white/65 hover:text-white text-sm transition-colors">
                    hello@greenscapenursery.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5">
        <div className="section-wrapper flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © 2026 GreenScape Nursery. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map(item => (
              <a key={item} href="#" className="text-white/50 hover:text-white text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
