import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import api from "../services/api";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = [
    { label: "All Services", value: "all" },
    { label: "Landscaping", value: "Landscaping" },
    { label: "Turf Installation", value: "Turf Installation" },
    { label: "Garden Maintenance", value: "Garden Maintenance" },
    { label: "Sports Field", value: "Sports Field" },
    { label: "Irrigation", value: "Irrigation" },
    { label: "Nursery", value: "Nursery" },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <div className="bg-[#fcfdfa] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Outdoor Engineering in Pune</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-serif text-green-950">
            Professional Landscaping & Turf Services
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            From preliminary soil analysis and 3D architectural master planning to laser-graded
            grass sod laying, sports arena construction, and automated irrigation.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                selectedCategory === cat.value
                  ? "bg-green-800 text-white shadow-green-900/20"
                  : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <div className="inline-block w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs font-semibold">Loading services from database...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl p-8 border border-gray-100">
            <p className="text-gray-500 text-sm">No services found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={service.bannerImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-green-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {service.category}
                    </div>
                    {service.startingPrice > 0 && (
                      <div className="absolute bottom-4 right-4 bg-green-900/90 text-white text-xs font-extrabold px-3 py-1 rounded-xl shadow-md">
                        Starting ₹{service.startingPrice} {service.priceUnit ? `/${service.priceUnit}` : ""}
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-green-950 group-hover:text-green-700 transition">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {service.features && service.features.length > 0 && (
                      <div className="pt-2 space-y-1.5 border-t border-gray-100">
                        {service.features.slice(0, 2).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs font-bold text-green-700 hover:text-green-950 transition flex items-center gap-1"
                  >
                    <span>Read Full Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to={`/quote?service=${encodeURIComponent(service.title)}`}
                    className="text-xs bg-green-700 hover:bg-green-800 text-white font-bold px-4 py-2 rounded-xl transition shadow"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
