import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  PhoneCall,
  Calendar,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import api from "../services/api";

export default function ServiceDetails() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${slug}`);
        if (res.data.success) {
          setService(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load service:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfdfa]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-gray-500">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfdfa] p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Service Not Found</h2>
        <p className="text-xs text-gray-500 mt-2">The requested landscaping service does not exist or has been moved.</p>
        <Link
          to="/services"
          className="mt-6 inline-flex items-center gap-2 bg-green-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfa] min-h-screen text-gray-800 pb-20">
      {/* 1. Header Banner */}
      <section className="relative bg-[#142d20] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
          style={{ backgroundImage: `url(${service.bannerImage})` }}
        />

        <div className="relative max-w-7xl mx-auto space-y-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-400 hover:text-white transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-lime-500/20 text-lime-300 text-xs font-extrabold px-3 py-1 rounded-full border border-lime-400/30">
              {service.category}
            </span>
            {service.startingPrice > 0 && (
              <span className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full">
                Starting ₹{service.startingPrice} {service.priceUnit ? `/${service.priceUnit}` : ""}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight max-w-3xl">
            {service.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Deep Overview */}
        <div className="lg:col-span-8 space-y-12">
          {/* Main Visual Image */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 max-h-[460px] bg-gray-100">
            <img
              src={service.bannerImage}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detailed Intro */}
          {service.intro && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-2xl font-black font-serif text-green-950">
                Service Overview
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {service.intro}
              </p>
            </div>
          )}

          {/* Features Included */}
          {service.features && service.features.length > 0 && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-green-900">
                <Sparkles className="w-5 h-5 text-lime-600" />
                <h2 className="text-2xl font-black font-serif">What We Deliver</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#f6fff3] border border-green-100 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-lime-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advantages / Why Us */}
          {service.advantages && service.advantages.length > 0 && (
            <div className="bg-gradient-to-br from-green-900 to-green-950 text-white p-8 rounded-3xl shadow-xl space-y-6">
              <h2 className="text-2xl font-black font-serif">
                Key Benefits for Pune Properties
              </h2>
              <div className="space-y-3">
                {service.advantages.map((adv, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-green-100">
                    <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-green-900">
                <HelpCircle className="w-5 h-5 text-lime-600" />
                <h2 className="text-2xl font-black font-serif">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-4 bg-gray-50/70 hover:bg-gray-100/70 flex justify-between items-center transition"
                    >
                      <span className="text-xs sm:text-sm font-bold text-gray-800">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform ${
                          openFaq === idx ? "rotate-180 text-green-700" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Service Inquiry
              </span>
              <h3 className="text-xl font-black text-green-950 mt-1">
                Get a Customized Proposal
              </h3>
              <p className="text-xs text-gray-500 mt-2">
                Our Pune agronomists will evaluate your site dimensions and provide an itemized quote.
              </p>
            </div>

            {service.startingPrice > 0 && (
              <div className="bg-[#f6fff3] p-4 rounded-2xl border border-green-100">
                <span className="text-[11px] text-gray-500 font-medium">Estimated Base Rate</span>
                <p className="text-2xl font-black text-green-900 mt-0.5">
                  ₹{service.startingPrice} <span className="text-xs font-semibold text-gray-500">/{service.priceUnit}</span>
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Link
                to={`/quote?service=${encodeURIComponent(service.title)}`}
                className="w-full block text-center bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition text-xs"
              >
                Request Quote for This Service
              </Link>

              <Link
                to="/estimator"
                className="w-full block text-center bg-lime-100 hover:bg-lime-200 text-green-950 font-bold py-3 rounded-xl transition text-xs"
              >
                Calculate Cost in Smart Planner
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-green-700" />
                <span>Immediate Call: +91 97676 71968</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-700" />
                <span>On-Site Inspection Across Pune</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
