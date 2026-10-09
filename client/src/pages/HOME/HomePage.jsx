import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Leaf,
  Shield,
  Clock,
  Compass,
  Star,
  Calculator,
  PhoneCall,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import api from "../../services/api";

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quick interactive preview state for home page mini-calculator
  const [miniArea, setMiniArea] = useState(600);
  const [miniSurface, setMiniSurface] = useState("natural"); // 'natural' (35/sqft) or 'artificial' (75/sqft)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [servicesRes, projectsRes, plantsRes, testimonialsRes] = await Promise.allSettled([
          api.get("/services"),
          api.get("/projects?featured=true"),
          api.get("/plants?isIndoor=true"),
          api.get("/testimonials"),
        ]);

        if (servicesRes.status === "fulfilled" && servicesRes.value.data.success) {
          setServices(servicesRes.value.data.data.slice(0, 6));
        }
        if (projectsRes.status === "fulfilled" && projectsRes.value.data.success) {
          setFeaturedProjects(projectsRes.value.data.data.slice(0, 3));
        }
        if (plantsRes.status === "fulfilled" && plantsRes.value.data.success) {
          setFeaturedPlants(plantsRes.value.data.data.slice(0, 4));
        }
        if (testimonialsRes.status === "fulfilled" && testimonialsRes.value.data.success) {
          setTestimonials(testimonialsRes.value.data.data);
        }
      } catch (err) {
        console.error("Home data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const calculatedMiniCost = Math.round(miniArea * (miniSurface === "natural" ? 35 : 75));

  return (
    <div className="bg-[#fcfdfa] text-gray-800">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center bg-gradient-to-r from-[#0d2818] via-[#1b4332] to-[#2d6a4f] text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image Overlay with Soft Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1920&q=80')",
          }}
        />

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-lime-400/20 border border-lime-400/40 text-lime-300 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              <span>Pune’s Trusted Landscape & Nursery Specialists</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.15]">
              Transform Your Outdoors Into{" "}
              <span className="text-lime-400 underline decoration-lime-500/50 underline-offset-8">
                Something Extraordinary
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-200 max-w-2xl font-normal leading-relaxed">
              At <strong className="text-white">Janai Landscape Services</strong>, we blend
              botanical science with world-class outdoor architecture. From velvety carpet
              lawns and rooftop terraces to sports turfs and custom villa gardens across Pune.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/quote"
                className="bg-lime-500 hover:bg-lime-400 text-green-950 font-black px-7 py-3.5 rounded-2xl shadow-xl hover:shadow-lime-500/20 transition-all text-sm flex items-center gap-2 group"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                to="/services"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3.5 rounded-2xl transition text-sm flex items-center gap-2"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>

            {/* Quick Micro-Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                <span>870+ Pune Gardens</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                <span>Direct Nursery Farm Supply</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                <span>Monsoon-Grade Drainage</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Interactive Quick Estimator Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl text-gray-800 border border-white/40">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-green-950">
                      Instant Cost Estimator
                    </h2>
                    <p className="text-[11px] text-gray-500">Live Pune market rates</p>
                  </div>
                </div>
                <span className="bg-lime-100 text-lime-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Free Tool
                </span>
              </div>

              <div className="space-y-4 pt-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1.5">
                    <span>Project Area (Sq Ft)</span>
                    <span className="font-bold text-green-800">{miniArea} sq ft</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="3000"
                    step="50"
                    value={miniArea}
                    onChange={(e) => setMiniArea(Number(e.target.value))}
                    className="w-full accent-green-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>150 sq ft (Balcony)</span>
                    <span>3000 sq ft (Villa Lawn)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Surface Selection
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setMiniSurface("natural")}
                      className={`p-2.5 rounded-xl border text-center font-medium transition ${
                        miniSurface === "natural"
                          ? "border-green-600 bg-green-50 text-green-900 font-bold"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      🌱 Natural Grass
                      <span className="block text-[10px] text-gray-500">₹35 / sq ft</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMiniSurface("artificial")}
                      className={`p-2.5 rounded-xl border text-center font-medium transition ${
                        miniSurface === "artificial"
                          ? "border-green-600 bg-green-50 text-green-900 font-bold"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      🍃 Artificial Turf
                      <span className="block text-[10px] text-gray-500">₹75 / sq ft</span>
                    </button>
                  </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-4 border border-green-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-500 font-medium">Estimated Budget</span>
                    <p className="text-2xl font-black text-green-900">
                      ₹{calculatedMiniCost.toLocaleString("en-IN")}*
                    </p>
                  </div>
                  <Link
                    to="/estimator"
                    className="text-xs bg-green-800 hover:bg-green-900 text-white font-bold px-3.5 py-2 rounded-xl transition shadow flex items-center gap-1"
                  >
                    <span>Full Planner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-[10px] text-gray-400 text-center leading-tight">
                  *Preliminary planning estimate. Soil grading, drainage & add-ons calculated separately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS COUNTER STRIP */}
      <section className="bg-white border-b border-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-[#f6fff3] border border-green-50">
            <h3 className="text-3xl sm:text-4xl font-black text-green-900">870+</h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">Gardens Designed</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#f6fff3] border border-green-50">
            <h3 className="text-3xl sm:text-4xl font-black text-green-900">48,000+</h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">Sq Ft Turf Installed</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#f6fff3] border border-green-50">
            <h3 className="text-3xl sm:text-4xl font-black text-green-900">100%</h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">Customer Satisfaction</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#f6fff3] border border-green-50">
            <h3 className="text-3xl sm:text-4xl font-black text-green-900">25+</h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">Pune Horticulturists</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SERVICES GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-green-950 mt-3">
              Comprehensive Landscaping Solutions
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl">
              Turnkey services designed specifically for residential estates, corporate campuses,
              and sporting facilities throughout Pune.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-green-800 hover:text-green-600 transition"
          >
            <span>View All 8 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={service.bannerImage}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-green-900 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                    {service.category || "Landscaping"}
                  </div>
                  {service.startingPrice > 0 && (
                    <div className="absolute bottom-4 right-4 bg-green-900/90 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md">
                      From ₹{service.startingPrice} {service.priceUnit ? `/${service.priceUnit}` : ""}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-950 group-hover:text-green-700 transition">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between">
                <Link
                  to={`/services/${service.slug}`}
                  className="text-xs font-bold text-green-700 hover:text-green-900 transition flex items-center gap-1"
                >
                  <span>Explore Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to={`/quote?service=${encodeURIComponent(service.title)}`}
                  className="text-xs bg-green-50 hover:bg-green-100 text-green-800 font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE JANAI LANDSCAPE SERVICES */}
      <section className="bg-[#1b4332] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-lime-400 bg-white/10 px-3 py-1 rounded-full">
              The Janai Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif leading-tight">
              Why Pune Homeowners & Architects Choose Us
            </h2>
            <p className="text-sm text-green-100 leading-relaxed">
              Landscaping in Maharashtra requires special consideration of black cotton soil,
              heavy monsoon downpours, and intense summer heat. We engineer every project
              specifically for Pune’s regional climate.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-lime-500 hover:bg-lime-400 text-green-950 font-bold text-xs px-5 py-3 rounded-xl transition shadow"
              >
                <span>Read About Our Expertise</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-lime-400 text-green-950 flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Direct Nursery Cultivation</h3>
              <p className="text-xs text-green-100 leading-relaxed">
                We supply plants and turf harvested directly from our Pune nursery farms,
                ensuring established root balls and zero acclimatization shock.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-lime-400 text-green-950 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Precision 3D CAD Planning</h3>
              <p className="text-xs text-green-100 leading-relaxed">
                Visualize every pathway, plant species, and lighting fixture before breaking
                ground with photorealistic 3D landscape renderings.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-lime-400 text-green-950 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Water-Saving Automation</h3>
              <p className="text-xs text-green-100 leading-relaxed">
                Smart timer-controlled pop-up sprinklers and drip laterals that reduce water
                consumption by up to 60% compared to traditional hose pipes.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-lime-400 text-green-950 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Turnkey Accountability</h3>
              <p className="text-xs text-green-100 leading-relaxed">
                Single-point responsibility from initial earthwork, soil fertilizing, and turf
                installation through scheduled seasonal maintenance care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS WITH BEFORE/AFTER PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-green-950 mt-3">
              Recent Work Across Pune
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl">
              Explore completed residential villa lawns, commercial tech parks, and sports arenas.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-green-800 hover:text-green-600 transition"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={project.afterImage}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 text-green-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {project.category}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
                    📍 {project.location}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-green-950">{project.title}</h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-500">Area: {project.area || "Custom"}</span>
                <Link
                  to="/projects"
                  className="font-bold text-green-700 hover:text-green-900 transition flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. NURSERY PLANTS HIGHLIGHTS */}
      <section className="py-20 bg-[#f6fff3] px-4 sm:px-6 lg:px-8 border-y border-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-white px-3 py-1 rounded-full border border-green-100 shadow-sm">
                Plant Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-serif text-green-950 mt-3">
                Acclimatized Nursery Plants
              </h2>
              <p className="text-sm text-gray-600 mt-2 max-w-xl">
                Nurtured at our Pune nursery for resilient outdoor gardens and air-purifying indoor spaces.
              </p>
            </div>

            <Link
              to="/plants"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-green-800 hover:text-green-600 transition"
            >
              <span>Explore All Plants & Care Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlants.map((plant) => (
              <div
                key={plant._id}
                className="bg-white rounded-2xl p-4 border border-green-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 rounded-xl overflow-hidden mb-3 bg-gray-50">
                    <img
                      src={plant.images[0]}
                      alt={plant.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-800 px-2 py-0.5 rounded-full">
                    {plant.category}
                  </span>
                  <h3 className="font-bold text-sm text-green-950 mt-1.5 line-clamp-1">
                    {plant.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 italic line-clamp-1">
                    {plant.botanicalName}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    {plant.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="font-extrabold text-sm text-green-800">
                    ₹{plant.price}
                  </span>
                  <Link
                    to={`/quote?service=Nursery%20Plant%20Order&plant=${encodeURIComponent(plant.name)}`}
                    className="text-xs bg-green-700 hover:bg-green-800 text-white font-medium px-3 py-1.5 rounded-lg transition"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-green-950 mt-3">
            What Pune Clients Say
          </h2>
          <p className="text-xs text-gray-400 mt-2">
            Sample client feedback from residential and commercial projects in Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, i) => (
            <div
              key={testi._id || i}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(testi.rating || 5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                  "{testi.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-50">
                <img
                  src={testi.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt={testi.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-sm font-bold text-green-950">{testi.name}</h3>
                  <p className="text-[11px] text-gray-500">{testi.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CONSULTATION CTA STRIP */}
      <section className="bg-gradient-to-r from-green-900 to-[#1b4332] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-serif">
            Ready to Bring Your Outdoor Vision to Life?
          </h2>
          <p className="text-sm sm:text-base text-green-100 max-w-2xl mx-auto leading-relaxed">
            Schedule a site visit in Pune. Our senior horticulturist will evaluate your soil,
            sunlight, and spatial possibilities to deliver a customized master plan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/quote"
              className="bg-lime-400 hover:bg-lime-300 text-green-950 font-black px-8 py-3.5 rounded-2xl shadow-xl transition text-sm"
            >
              Request Free Site Quotation
            </Link>
            <a
              href="tel:+919767671968"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded-2xl transition text-sm flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 97676 71968</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
