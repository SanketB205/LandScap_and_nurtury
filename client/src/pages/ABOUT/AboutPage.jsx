import { Link } from "react-router-dom";
import {
  Leaf,
  ShieldCheck,
  CheckCircle,
  Compass,
  Sparkles,
  Users,
  Award,
  ArrowRight,
  PhoneCall,
} from "lucide-react";

export default function AboutPage() {
  const commitments = [
    {
      title: "Pune Climate-First Horticulture",
      desc: "Every plant variety and turf sod is evaluated for compatibility with Maharashtra's black cotton soils, intense summers, and torrential monsoons.",
    },
    {
      title: "Direct Nursery Cultivation",
      desc: "We grow and acclimatize our own stock in Pune nursery farms, guaranteeing viable root balls, pest-free health, and zero dealer markups.",
    },
    {
      title: "Automated Water Stewardship",
      desc: "We design closed hydraulic irrigation networks with micro-drippers and timers that conserve up to 60% of water while keeping lawns lush.",
    },
    {
      title: "Transparent Turnkey Delivery",
      desc: "Single point of accountability from initial 3D master plans to laser grading, turf installation, and ongoing seasonal maintenance.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Site Consultation & Soil Testing",
      desc: "We visit your property in Pune to measure exact sunlight vectors, assess drainage grades, and test soil fertility.",
    },
    {
      step: "02",
      title: "2D Layout & 3D Visual Masterplan",
      desc: "Our landscape architects craft photorealistic 3D renderings showcasing plant placements, pathways, and turf zoning.",
    },
    {
      step: "03",
      title: "Earthwork, Drainage & Soil Enrichment",
      desc: "We excavate or grade the ground, install herringbone sub-drainage, and blend enriched red soil with vermicompost.",
    },
    {
      step: "04",
      title: "Precision Turf Sodding & Planting",
      desc: "Fresh turf sod or premium UV-stabilized synthetic grass is laid alongside healthy specimen trees, hedges, and flower beds.",
    },
    {
      step: "05",
      title: "Handover & Seasonal Care Schedule",
      desc: "We walk you through watering schedules and provide structured monthly maintenance packages to safeguard your investment.",
    },
  ];

  return (
    <div className="bg-[#fcfdfa] text-gray-800 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-lime-700" />
            <span>Rooted in Pune, Maharashtra</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-serif text-green-950">
            About Janai Landscape Services
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Nurturing nature and elevating outdoor architecture since our inception.
            Specializing in residential gardens, commercial plazas, and professional sports turfs.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full">
              Our Heritage & Philosophy
            </span>
            <h2 className="text-3xl font-black font-serif text-green-950 leading-tight">
              Crafting Living Sanctuaries Tailored to Nature
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              At <strong>Janai Landscape Services</strong> (also operating with pride as EverGreen Landscapes & Nursery),
              we believe an outdoor space is an extension of your living environment. We don’t just
              lay grass or arrange plants; we design sustainable ecosystems that thrive effortlessly
              under Pune's tropical climate.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              With our expansive nursery base, experienced agronomists, and skilled landscaping craftsmen,
              we have successfully executed over 870 garden projects across Baner, Koregaon Park,
              Kothrud, Hinjewadi, Wakad, Mulshi, and surrounding districts.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/quote"
                className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition"
              >
                Schedule Site Consultation
              </Link>
              <Link
                to="/services"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs px-6 py-3 rounded-xl transition"
              >
                View Services
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-96 bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80"
                alt="Janai Landscape team at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-lime-400 text-green-950 p-6 rounded-2xl shadow-xl font-bold hidden sm:block">
              <span className="block text-3xl font-black">870+</span>
              <span className="text-xs uppercase tracking-wider font-extrabold">Gardens Delivered</span>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1b4332] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-lime-400 text-green-950 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black font-serif">Our Mission</h3>
            <p className="text-xs sm:text-sm text-green-100 leading-relaxed">
              To deliver breathtaking, environmentally sustainable landscapes and high-performance
              turfs by combining proven horticulture science, modern water conservation technology,
              and transparent client-first execution.
            </p>
          </div>

          <div className="bg-[#142d20] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-lime-400 text-green-950 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black font-serif">Our Vision</h3>
            <p className="text-xs sm:text-sm text-green-100 leading-relaxed">
              To be Maharashtra’s most respected green architecture partner—recognized for bringing
              biodiverse beauty, cooling living lawns, and joyful outdoor gathering spaces to every
              neighborhood we serve.
            </p>
          </div>
        </div>

        {/* Quality Commitments */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full">
              Standards We Uphold
            </span>
            <h2 className="text-3xl font-black font-serif text-green-950">
              Our Core Quality Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-green-50 text-green-800 flex items-center justify-center font-bold">
                  <CheckCircle className="w-5 h-5 text-lime-600" />
                </div>
                <h3 className="text-base font-bold text-green-950">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Step Process */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full">
              How We Work
            </span>
            <h2 className="text-3xl font-black font-serif text-green-950">
              From Concept to Handover
            </h2>
            <p className="text-xs text-gray-500">
              A structured engineering workflow that guarantees precision and eliminates guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="space-y-3 relative">
                <span className="text-3xl font-black text-lime-600 font-serif block">
                  {step.step}
                </span>
                <h3 className="text-sm font-bold text-green-950">{step.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}