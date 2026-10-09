import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Eye,
  Sliders,
  Sparkles,
} from "lucide-react";
import api from "../services/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Track active Before/After toggle view per project
  const [activeViews, setActiveViews] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let url = "/projects?";
        if (selectedCategory !== "all") url += `category=${selectedCategory}`;
        const res = await api.get(url);
        if (res.data.success) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [selectedCategory]);

  const toggleView = (id, mode) => {
    setActiveViews((prev) => ({ ...prev, [id]: mode }));
  };

  const categories = [
    { label: "All Projects", value: "all" },
    { label: "Residential Villas", value: "Residential" },
    { label: "Commercial Tech Parks", value: "Commercial" },
    { label: "Sports Turf Arenas", value: "Sports Turf" },
    { label: "Terrace & Sky Gardens", value: "Terrace Garden" },
  ];

  return (
    <div className="bg-[#fcfdfa] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-lime-700" />
            <span>Executed Across Pune, Maharashtra</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-serif text-green-950">
            Completed Landscape Projects
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Real before-and-after transformations showcasing natural grass sodding, FIFA-standard
            commercial football turfs, and luxury residential garden architecture.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                selectedCategory === cat.value
                  ? "bg-green-800 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <div className="inline-block w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs font-semibold">Loading completed portfolio...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl p-8 border border-gray-100">
            <p className="text-gray-500 text-sm">No projects found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {projects.map((project) => {
              const currentMode = activeViews[project._id] || "after";
              const currentImage =
                currentMode === "before" && project.beforeImage
                  ? project.beforeImage
                  : project.afterImage;

              return (
                <div
                  key={project._id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area with Interactive Before / After Switcher */}
                    <div className="relative h-72 sm:h-80 bg-gray-100 overflow-hidden">
                      <img
                        src={currentImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700"
                        loading="lazy"
                      />

                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-green-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                        {project.category}
                      </span>

                      {/* Interactive Before/After Toggle Controls */}
                      {project.beforeImage && (
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-1 rounded-xl flex gap-1 shadow-lg">
                          <button
                            onClick={() => toggleView(project._id, "before")}
                            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition ${
                              currentMode === "before"
                                ? "bg-amber-400 text-black shadow"
                                : "text-white/80 hover:text-white"
                            }`}
                          >
                            Before
                          </button>
                          <button
                            onClick={() => toggleView(project._id, "after")}
                            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition ${
                              currentMode === "after"
                                ? "bg-lime-400 text-green-950 shadow"
                                : "text-white/80 hover:text-white"
                            }`}
                          >
                            After (Completed)
                          </button>
                        </div>
                      )}

                      {/* Location Badge */}
                      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-xl flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-lime-400" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <h2 className="text-xl sm:text-2xl font-black font-serif text-green-950">
                          {project.title}
                        </h2>
                        {project.area && (
                          <span className="text-xs bg-green-50 text-green-800 font-bold px-2.5 py-1 rounded-lg shrink-0">
                            {project.area}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {project.description}
                      </p>

                      {project.gallery && project.gallery.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                            Project Gallery Photos:
                          </span>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {project.gallery.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt="Gallery thumbnail"
                                className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-0 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Client: <strong className="text-gray-600">{project.clientName || "Confidential"}</strong>
                    </span>

                    <Link
                      to={`/quote?service=Project%20Inquiry&notes=Referencing%20Project:%20${encodeURIComponent(project.title)}`}
                      className="text-xs bg-green-700 hover:bg-green-800 text-white font-bold px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5"
                    >
                      <span>Inquire Similar Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
