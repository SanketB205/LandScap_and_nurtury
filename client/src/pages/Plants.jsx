import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Sun,
  Droplets,
  Sparkles,
  Info,
  X,
  CheckCircle,
  Leaf,
  Maximize2,
} from "lucide-react";
import api from "../services/api";

export default function PlantsPage() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSunlight, setSelectedSunlight] = useState("all");
  const [selectedWatering, setSelectedWatering] = useState("all");
  const [activeModalPlant, setActiveModalPlant] = useState(null);

  // Smart Recommendation Engine State
  const [showRecommender, setShowRecommender] = useState(false);
  const [recSunlight, setRecSunlight] = useState("Full Sun");
  const [recWatering, setRecWatering] = useState("Moderate");
  const [recSpace, setRecSpace] = useState("Medium");
  const [recommendedPlants, setRecommendedPlants] = useState([]);
  const [recLoading, setRecLoading] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, [selectedCategory, selectedSunlight, selectedWatering]);

  const fetchPlants = async () => {
    setLoading(true);
    try {
      let query = "/plants?";
      if (selectedCategory !== "all") query += `category=${selectedCategory}&`;
      if (selectedSunlight !== "all") query += `sunlight=${encodeURIComponent(selectedSunlight)}&`;
      if (selectedWatering !== "all") query += `watering=${encodeURIComponent(selectedWatering)}&`;
      if (search) query += `search=${encodeURIComponent(search)}&`;

      const res = await api.get(query);
      if (res.data.success) {
        setPlants(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load plants:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPlants();
  };

  const runRecommender = async () => {
    setRecLoading(true);
    try {
      const res = await api.get(
        `/plants/recommendations?sunlight=${encodeURIComponent(recSunlight)}&watering=${encodeURIComponent(recWatering)}&space=${encodeURIComponent(recSpace)}`
      );
      if (res.data.success) {
        setRecommendedPlants(res.data.data);
      }
    } catch (err) {
      console.error("Recommender error:", err);
    } finally {
      setRecLoading(false);
    }
  };

  useEffect(() => {
    if (showRecommender) {
      runRecommender();
    }
  }, [showRecommender, recSunlight, recWatering, recSpace]);

  const categories = [
    { label: "All Plants", value: "all" },
    { label: "Indoor Plants", value: "indoor" },
    { label: "Flowering", value: "flowering" },
    { label: "Ornamental", value: "ornamental" },
    { label: "Lawn Grass (Sod)", value: "lawn-grass" },
    { label: "Trees", value: "trees" },
    { label: "Shrubs", value: "shrubs" },
  ];

  return (
    <div className="bg-[#fcfdfa] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full">
            <Leaf className="w-3.5 h-3.5 text-lime-700" />
            <span>Direct From Our Pune Nursery</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black font-serif text-green-950">
            Nursery Plant Catalog & Care Guides
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Acclimatized indoor foliage, flowering shrubs, lawn turf mats, and avenue trees
            cultivated for Pune and Maharashtra climatic conditions.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setShowRecommender(!showRecommender)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-500 to-green-600 text-green-950 font-extrabold text-xs px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>{showRecommender ? "Hide Plant Matchmaker" : "Try Intelligent Plant Matchmaker"}</span>
            </button>
          </div>
        </div>

        {/* Intelligent Plant Matchmaker Box */}
        {showRecommender && (
          <div className="bg-gradient-to-br from-green-900 to-[#142d20] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 animate-fade-in border border-green-800">
            <div className="flex items-center justify-between pb-4 border-b border-green-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-lime-400" />
                <h3 className="text-xl font-bold font-serif">Smart Nursery Recommendations</h3>
              </div>
              <span className="text-xs bg-lime-400/20 text-lime-300 px-3 py-1 rounded-full">
                Horticultural Engine
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Sunlight Available</label>
                <select
                  value={recSunlight}
                  onChange={(e) => setRecSunlight(e.target.value)}
                  className="w-full bg-green-950 border border-green-700 text-white p-2.5 rounded-xl focus:ring-2 focus:ring-lime-400"
                >
                  <option value="Full Sun">Full Sun (6+ hours)</option>
                  <option value="Indirect Bright">Indirect Bright (Windowsill / Balcony)</option>
                  <option value="Partial Shade">Partial Shade</option>
                  <option value="Low Light">Low Light (Living Room / Bedroom)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Watering Routine</label>
                <select
                  value={recWatering}
                  onChange={(e) => setRecWatering(e.target.value)}
                  className="w-full bg-green-950 border border-green-700 text-white p-2.5 rounded-xl focus:ring-2 focus:ring-lime-400"
                >
                  <option value="Low">Low (Drought-tolerant / Infrequent)</option>
                  <option value="Moderate">Moderate (1-2 times weekly)</option>
                  <option value="High">High (Daily watering / Moist soil)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Available Space</label>
                <select
                  value={recSpace}
                  onChange={(e) => setRecSpace(e.target.value)}
                  className="w-full bg-green-950 border border-green-700 text-white p-2.5 rounded-xl focus:ring-2 focus:ring-lime-400"
                >
                  <option value="Small">Small (Desktop / Small Balcony Planter)</option>
                  <option value="Medium">Medium (Floor Pot / Garden Border)</option>
                  <option value="Large">Large (Avenue / Boundary Wall)</option>
                </select>
              </div>
            </div>

            {/* Recommendations Display */}
            <div>
              <p className="text-xs text-lime-300 font-bold mb-3">
                Matched Varieties for Your Environment:
              </p>
              {recLoading ? (
                <p className="text-xs text-gray-400">Evaluating matching varieties...</p>
              ) : recommendedPlants.length === 0 ? (
                <p className="text-xs text-gray-400">No exact match found, showing versatile plants below.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendedPlants.map((plant) => (
                    <div
                      key={plant._id}
                      className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 hover:border-lime-400 transition"
                    >
                      <img
                        src={plant.images[0]}
                        alt={plant.name}
                        className="w-full h-28 object-cover rounded-xl mb-2"
                      />
                      <h4 className="font-bold text-xs text-white line-clamp-1">{plant.name}</h4>
                      <p className="text-[11px] text-lime-300">₹{plant.price}</p>
                      <button
                        onClick={() => setActiveModalPlant(plant)}
                        className="mt-2 w-full text-[10px] bg-lime-400 text-green-950 font-bold py-1 rounded-lg"
                      >
                        View Why It Fits
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search plants by common or botanical name (e.g. Palm, Hibiscus, Ficus)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition"
            >
              Search
            </button>
          </form>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-gray-500 mr-1">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    selectedCategory === cat.value
                      ? "bg-green-800 text-white font-bold"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedSunlight}
                onChange={(e) => setSelectedSunlight(e.target.value)}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-700 outline-none"
              >
                <option value="all">All Sunlight Levels</option>
                <option value="Full Sun">Full Sun</option>
                <option value="Indirect Bright">Indirect Bright</option>
                <option value="Partial Shade">Partial Shade</option>
                <option value="Low Light">Low Light</option>
              </select>

              <select
                value={selectedWatering}
                onChange={(e) => setSelectedWatering(e.target.value)}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-700 outline-none"
              >
                <option value="all">All Watering Frequencies</option>
                <option value="Low">Low Water</option>
                <option value="Moderate">Moderate Water</option>
                <option value="High">High Water</option>
              </select>
            </div>
          </div>
        </div>

        {/* Plants Catalog Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <div className="inline-block w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs font-semibold">Loading plant catalog...</p>
          </div>
        ) : plants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl p-8 border border-gray-100">
            <p className="text-gray-500 text-sm">No plants match your current filter parameters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <div
                key={plant._id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={plant.images[0]}
                      alt={plant.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-green-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase">
                      {plant.category}
                    </span>
                    {plant.inStock ? (
                      <span className="absolute bottom-3 right-3 bg-green-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                        In Stock ({plant.stockQuantity})
                      </span>
                    ) : (
                      <span className="absolute bottom-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-sm text-green-950 line-clamp-1">{plant.name}</h3>
                    <p className="text-[11px] text-gray-400 italic line-clamp-1">
                      {plant.botanicalName || "Native Pune specimen"}
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-gray-600">
                      <span className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">
                        <Sun className="w-3 h-3 text-amber-600" />
                        <span>{plant.sunlight}</span>
                      </span>
                      <span className="flex items-center gap-1 bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md">
                        <Droplets className="w-3 h-3 text-blue-600" />
                        <span>{plant.watering}</span>
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 pt-1 leading-relaxed">
                      {plant.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-base font-black text-green-900">
                    ₹{plant.price}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalPlant(plant)}
                      className="text-xs text-gray-500 hover:text-green-800 p-1.5 rounded-lg border border-gray-200 hover:border-green-600 transition"
                      title="View Plant Care Guide"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      to={`/quote?service=Nursery%20Plant%20Order&plant=${encodeURIComponent(plant.name)}`}
                      className="text-xs bg-green-700 hover:bg-green-800 text-white font-bold px-3 py-1.5 rounded-xl transition shadow"
                    >
                      Inquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Comprehensive Plant Details & Care Guide */}
        {activeModalPlant && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveModalPlant(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={activeModalPlant.images[0]}
                  alt={activeModalPlant.name}
                  className="w-24 h-24 rounded-2xl object-cover shadow"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-900 px-2 py-0.5 rounded-full">
                    {activeModalPlant.category}
                  </span>
                  <h3 className="text-xl font-bold text-green-950 mt-1">{activeModalPlant.name}</h3>
                  <p className="text-xs text-gray-500 italic">{activeModalPlant.botanicalName}</p>
                  <p className="text-base font-black text-green-900 mt-1">₹{activeModalPlant.price}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-gray-700">
                <h4 className="font-bold text-gray-900 text-sm">Description</h4>
                <p>{activeModalPlant.description}</p>
              </div>

              <div className="bg-[#f6fff3] p-4 rounded-2xl border border-green-100 space-y-2 text-xs">
                <h4 className="font-bold text-green-950 flex items-center gap-1.5 text-sm">
                  <Leaf className="w-4 h-4 text-lime-700" />
                  <span>Horticultural Care Instructions</span>
                </h4>
                <p className="text-gray-700 leading-relaxed">{activeModalPlant.careInstructions}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border">
                  <span className="text-[10px] text-gray-400 block font-semibold">Sunlight</span>
                  <strong className="text-gray-800">{activeModalPlant.sunlight}</strong>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border">
                  <span className="text-[10px] text-gray-400 block font-semibold">Watering</span>
                  <strong className="text-gray-800">{activeModalPlant.watering}</strong>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border">
                  <span className="text-[10px] text-gray-400 block font-semibold">Space</span>
                  <strong className="text-gray-800">{activeModalPlant.space}</strong>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/quote?service=Nursery%20Plant%20Order&plant=${encodeURIComponent(activeModalPlant.name)}`}
                  className="w-full block text-center bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl transition text-xs shadow"
                >
                  Inquire & Reserve This Plant
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
