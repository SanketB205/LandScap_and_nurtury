import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import api from "../services/api";
import { useToast } from "../context/ToastContext";

export default function ContactPage() {
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      error("Please fill in your name, phone, and email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/inquiries", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        type: "general",
        serviceName: formData.subject,
        message: formData.message,
        location: "Pune",
      });

      if (res.data.success) {
        setSubmitted(true);
        success("Message sent successfully! Our team will reach out shortly.");
      }
    } catch (err) {
      error(err.message || "Failed to submit contact message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fcfdfa] text-gray-800 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-lime-700" />
            <span>Connect with our Pune Team</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-serif text-green-950">
            Contact Janai Landscape Services
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Have questions about a new garden design, artificial turf supply, football arena,
            or bulk nursery plant order? We’re here to assist.
          </p>
        </div>

        {/* 2-Column Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1b4332] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <h2 className="text-2xl font-black font-serif">Pune Office & Nursery</h2>

              <div className="space-y-4 text-xs sm:text-sm text-green-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Address</strong>
                    <p className="leading-relaxed">
                      Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune, Maharashtra 411045
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-lime-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-semibold">Phone</strong>
                    <a href="tel:+919767671968" className="hover:text-white font-bold text-lime-300">
                      +91 97676 71968
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-lime-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-semibold">Email</strong>
                    <a href="mailto:contact@janailandscape.com" className="hover:text-white">
                      contact@janailandscape.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Operating Hours</strong>
                    <p>Mon–Sat: 8:30 AM – 7:30 PM</p>
                    <p>Sunday: 9:00 AM – 2:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/919767671968?text=Hello%20Janai%20Landscape%20Services,%20I%20have%20an%20inquiry%20regarding%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 rounded-xl text-xs shadow transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-64 bg-gray-100">
              <iframe
                title="Janai Landscape Services Pune Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.164369483321!2d73.78440787595304!3d18.56661146776118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf30f6587d19%3A0x6e38b3684a2ef695!2sBaner%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-xl space-y-6">
            <h2 className="text-2xl font-black font-serif text-green-950">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="bg-[#f6fff3] p-8 rounded-2xl border border-green-200 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-green-900">Message Delivered!</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you for reaching out. A representative will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-green-800 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ramesh Kulkarni"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98220 12345"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Residential Garden Design">Residential Garden Design</option>
                      <option value="Artificial Turf / Natural Grass">Artificial Turf / Natural Grass</option>
                      <option value="Football Turf Construction">Football Turf Construction</option>
                      <option value="Bulk Nursery Plants">Bulk Nursery Plants</option>
                      <option value="Garden Maintenance Packages">Garden Maintenance Packages</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us about your requirements or question..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{submitting ? "Sending Message..." : "Send Message"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
