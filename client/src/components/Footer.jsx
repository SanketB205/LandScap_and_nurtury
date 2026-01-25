import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-[#2c2c2c] text-gray-300">
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/leaf-pattern.png')] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        
        {/* ABOUT */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Janai Associates is one of few companies in Pune working in
            landscaping design & development as well as sports field construction.
            Whether it's beautifying your garden or creating professional playgrounds,
            we are there for you!
          </p>

          <button className="mt-6 bg-green-700 hover:bg-lime-600 text-white px-6 py-3 rounded font-semibold transition">
            Learn More
          </button>
        </div>

        {/* EXTRA NAVIGATION */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Extra Navigation</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Galleries",
              "Frequently Asked Questions",
              "Blog",
              "Contact Us",
              "Services",
              "Privacy Policy",
            ].map((item, i) => (
              <li key={i} className="hover:text-lime-400 cursor-pointer transition">
                ➜ {item}
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            {[
              "View all Services",
              "Artificial Grass Dealer in Pune",
              "LawnGrass Supply",
              "Landscape Design",
              "Football Turf",
              "Terrace & Balcony Garden Ideas",
              "Garden Maintenance Services",
            ].map((item, i) => (
              <li key={i} className="hover:text-lime-400 cursor-pointer transition">
                ➜ {item}
              </li>
            ))}
          </ul>
        </div>

        {/* WORKING HOURS */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Working Hours</h3>
          <ul className="space-y-3 text-sm">
            {[
              ["Monday", "09:00–20:00"],
              ["Tuesday", "09:00–20:00"],
              ["Wednesday", "09:00–20:00"],
              ["Thursday", "09:00–20:00"],
              ["Friday", "09:00–20:00"],
              ["Saturday", "09:00–20:00"],
            ].map(([day, time]) => (
              <li key={day} className="flex justify-between border-b border-gray-600 pb-1">
                <span>{day}</span>
                <span>{time}</span>
              </li>
            ))}
            <li className="flex justify-between font-semibold text-green-700">
              <span>Sunday</span>
              <span className="text-white bg-gray-800 px-3 py-1 rounded">
                CLOSED
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative border-t border-gray-700 py-4 px-6 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between">
        <span>© 2018 EverGreen Associates</span>
        <span>We work all over Maharashtra</span>
        <span>For more info contact: 9767671968</span>
      </div>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/919767671968"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 font-semibold"
      >
        WhatsApp Us
      </a>
    </footer>
  );
};

export default Footer;
