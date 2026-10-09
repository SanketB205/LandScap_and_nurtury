import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  CheckCircle,
  Copy,
  MessageCircle,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Phone,
} from "lucide-react";
import api from "../services/api";
import { useToast } from "../context/ToastContext";

export default function QuoteRequestPage() {
  const [searchParams] = useSearchParams();
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceName: searchParams.get("service") || "Natural Grass and Artificial Turf Installation",
    propertyType: "Residential Villa",
    areaSqFt: searchParams.get("areaSqFt") || 600,
    location: "Baner, Pune",
    budgetRange: searchParams.get("estimatedBudget") || "₹50,000 - ₹1,00,000",
    preferredDate: "",
    message: searchParams.get("notes") || "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // If plant parameter is present
    const plant = searchParams.get("plant");
    if (plant) {
      setFormData((prev) => ({
        ...prev,
        serviceName: "Nursery Plants and Gardening Supplies",
        message: `Inquiring regarding nursery order for: ${plant}. Please provide availability and delivery cost.`,
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      error("Please provide your name, phone number, and email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/inquiries", {
        ...formData,
        type: "quote",
      });

      if (res.data.success) {
        setSubmittedInquiry({
          referenceId: res.data.referenceId,
          name: formData.name,
          phone: formData.phone,
          serviceName: formData.serviceName,
        });
        success("Quotation request submitted successfully!");
      }
    } catch (err) {
      error(err.message || "Failed to submit quote request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (submittedInquiry?.referenceId) {
      navigator.clipboard.writeText(submittedInquiry.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-[#fcfdfa] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-lime-700" />
            <span>Official Quotation & Consultation</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif text-green-950">
            Request a Free Project Quotation
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            Provide your property specifics below. A dedicated Pune landscape architect
            will contact you to provide an itemized proposal and schedule an on-site visit.
          </p>
        </div>

        {/* Confirmation Screen on Success */}
        {submittedInquiry ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-green-200 shadow-2xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-green-950 font-serif">
                Quotation Request Received!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                Thank you, <strong className="text-gray-900">{submittedInquiry.name}</strong>.
                Your inquiry has been assigned a unique tracking reference.
              </p>
            </div>

            {/* Reference ID Pill */}
            <div className="bg-[#f6fff3] p-4 rounded-2xl border border-green-200 max-w-sm mx-auto flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Reference ID
                </span>
                <span className="text-xl font-black text-green-900 tracking-wider">
                  {submittedInquiry.referenceId}
                </span>
              </div>
              <button
                onClick={handleCopyRef}
                className="flex items-center gap-1 bg-white hover:bg-green-50 border border-green-300 text-green-800 text-xs font-bold px-3 py-1.5 rounded-xl transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <a
                href={`https://wa.me/919767671968?text=Hello%20Janai%20Landscape%20Services,%20I%20have%20submitted%20inquiry%20reference%20${submittedInquiry.referenceId}%20for%20${encodeURIComponent(submittedInquiry.serviceName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Track Instantly via WhatsApp</span>
              </a>

              <Link
                to="/"
                className="block text-xs font-bold text-green-800 hover:text-green-950 hover:underline pt-2"
              >
                ← Return to Homepage
              </Link>
            </div>

            <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
              Note: Formal quotation and appointment dates are subject to confirmation by our Pune operations team.
            </p>
          </div>
        ) : (
          /* Main Quotation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Anand Deshpande"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone Number (WhatsApp) <span className="text-red-500">*</span>
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

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. anand@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Service Required
                </label>
                <select
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                >
                  <option value="Landscape Design and Planning">Landscape Design and Planning</option>
                  <option value="Garden Development and Maintenance">Garden Development and Maintenance</option>
                  <option value="Natural Grass and Artificial Turf Installation">Natural Grass & Artificial Turf</option>
                  <option value="Sports Ground and Sports Field Development">Sports Field & Turf Development</option>
                  <option value="Nursery Plants and Gardening Supplies">Nursery Plants & Supplies</option>
                  <option value="Irrigation Systems (Drip & Sprinkler)">Irrigation Systems (Drip & Sprinkler)</option>
                  <option value="Residential and Commercial Landscaping">Residential & Commercial Landscaping</option>
                  <option value="Lawn Renovation and Maintenance">Lawn Renovation & Care</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                >
                  <option value="Residential Villa">Residential Villa / Bungalow</option>
                  <option value="Apartment/Terrace">Apartment / Penthouse Terrace</option>
                  <option value="Commercial/IT Park">Commercial Building / IT Campus</option>
                  <option value="Sports Ground">Commercial Sports Ground / Arena</option>
                  <option value="Farmhouse">Farmhouse / Weekend Home</option>
                  <option value="Other">Other Property Type</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Approximate Area (Sq Ft)
                </label>
                <input
                  type="number"
                  name="areaSqFt"
                  placeholder="e.g. 800"
                  value={formData.areaSqFt}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Project Location in Pune
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Baner, Koregaon Park, Wakad, Mulshi"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Estimated Budget Range
                </label>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                >
                  <option value="Under ₹25,000">Under ₹25,000</option>
                  <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                  <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                  <option value="₹2,50,000+">₹2,50,000+ (Turnkey / Sports)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Project Notes & Specific Requirements
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Mention any specific requests like sunlight conditions, slope issues, pet friendliness, or design inspirations..."
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
              ></textarea>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border text-xs text-gray-500 space-y-1">
              <div className="flex items-center gap-1.5 text-gray-700 font-bold">
                <Shield className="w-4 h-4 text-green-700" />
                <span>Our Privacy & Quality Guarantee</span>
              </div>
              <p>
                Your details are kept confidential. Submitting this form does not bind you to any purchase.
                Our team will issue a customized quotation with zero obligation.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-extrabold py-4 rounded-2xl shadow-xl transition text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{submitting ? "Submitting Inquiry..." : "Submit Quotation Request"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
