import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle,
  HelpCircle,
  Clock,
  Layers,
  Leaf,
} from "lucide-react";
import api from "../services/api";

export default function SmartEstimator() {
  const navigate = useNavigate();

  // Form Inputs
  const [areaLength, setAreaLength] = useState(25);
  const [areaWidth, setAreaWidth] = useState(20);
  const [surfaceType, setSurfaceType] = useState("natural-lawn");
  const [irrigationType, setIrrigationType] = useState("drip");
  const [includeSoilPrep, setIncludeSoilPrep] = useState(true);
  const [includePathway, setIncludePathway] = useState(false);
  const [includeLighting, setIncludeLighting] = useState(false);
  const [plantPreference, setPlantPreference] = useState("medium");

  // Estimation Result State
  const [estimateData, setEstimateData] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateEstimate = async () => {
    setLoading(true);
    try {
      const res = await api.post("/planner/estimate", {
        areaLength,
        areaWidth,
        surfaceType,
        irrigationType,
        includeSoilPrep,
        includePathway,
        includeLighting,
        plantPreference,
      });

      if (res.data.success) {
        setEstimateData(res.data.data);
      }
    } catch (err) {
      console.error("Estimate calculation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateEstimate();
  }, [
    areaLength,
    areaWidth,
    surfaceType,
    irrigationType,
    includeSoilPrep,
    includePathway,
    includeLighting,
    plantPreference,
  ]);

  const handleTransferToQuote = () => {
    if (!estimateData) return;
    const query = new URLSearchParams({
      areaSqFt: estimateData.areaSqFt,
      surfaceType,
      estimatedBudget: `₹${estimateData.totalEstimate.toLocaleString("en-IN")}`,
      notes: `Generated via Smart Estimator: ${surfaceType}, ${irrigationType} irrigation, estimated ₹${estimateData.totalEstimate}.`,
    }).toString();
    navigate(`/quote?${query}`);
  };

  const calculatedSqFt = areaLength * areaWidth;

  return (
    <div className="bg-[#fcfdfa] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-lime-100 text-green-900 text-xs font-extrabold px-3.5 py-1 rounded-full border border-lime-300">
            <Sparkles className="w-3.5 h-3.5 text-lime-700" />
            <span>Interactive Landscape & Turf Planning Tool</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-serif text-green-950">
            Smart Landscape Cost Estimator
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Configure your outdoor dimensions, desired surface finish, irrigation automation,
            and planting density to generate an immediate itemized budget estimate based on live
            Pune rates.
          </p>
        </div>

        {/* 2-Column Tool Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl space-y-8">
            {/* Dimensions */}
            <div>
              <h2 className="text-base font-extrabold text-green-950 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Garden or Outdoor Dimensions</span>
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Length (in feet)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="200"
                    value={areaLength}
                    onChange={(e) => setAreaLength(Math.max(1, Number(e.target.value)))}
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Width (in feet)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="200"
                    value={areaWidth}
                    onChange={(e) => setAreaWidth(Math.max(1, Number(e.target.value)))}
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>
              </div>

              <div className="mt-3 bg-green-50/70 p-3 rounded-xl border border-green-100 flex justify-between items-center text-xs font-bold text-green-900">
                <span>Calculated Project Area:</span>
                <span className="text-sm font-black">{calculatedSqFt} Sq Ft</span>
              </div>
            </div>

            {/* Surface Type */}
            <div>
              <h2 className="text-base font-extrabold text-green-950 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Select Surface / Turf Finish</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  {
                    id: "natural-lawn",
                    name: "Natural Carpet Grass",
                    desc: "Selection One / Korean living sod (Cool, velvety, eco-friendly)",
                    rate: "₹35 / sq ft",
                  },
                  {
                    id: "artificial-turf",
                    name: "35mm Artificial Turf",
                    desc: "Zero-maintenance UV synthetic turf for balconies, pets & lawns",
                    rate: "₹75 / sq ft",
                  },
                  {
                    id: "sports-turf",
                    name: "Sports Field Turf",
                    desc: "50mm high-durability turf with rubber & silica infill for play",
                    rate: "₹110 / sq ft",
                  },
                  {
                    id: "garden-mix",
                    name: "Hybrid Lawn & Planting",
                    desc: "50% natural carpet grass with perimeter decorative shrubs",
                    rate: "₹55 / sq ft",
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSurfaceType(opt.id)}
                    className={`p-4 rounded-2xl border text-left transition ${
                      surfaceType === opt.id
                        ? "border-green-600 bg-green-50 shadow-sm"
                        : "border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-green-950">{opt.name}</span>
                      <span className="text-[11px] font-bold text-green-700">{opt.rate}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-tight">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Irrigation & Soil Preparation */}
            <div>
              <h2 className="text-base font-extrabold text-green-950 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>Irrigation & Soil Engineering</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1.5">
                    Irrigation System
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "none", label: "Manual Hose (None)", rate: "₹0" },
                      { id: "drip", label: "Automated Drip", rate: "+₹18/sqft" },
                      { id: "sprinkler", label: "Pop-Up Sprinklers", rate: "+₹28/sqft" },
                    ].map((irr) => (
                      <button
                        key={irr.id}
                        type="button"
                        onClick={() => setIrrigationType(irr.id)}
                        className={`p-3 rounded-xl border text-center transition font-medium ${
                          irrigationType === irr.id
                            ? "border-green-600 bg-green-50 text-green-900 font-bold"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <div>{irr.label}</div>
                        <span className="text-[10px] text-gray-500 font-normal">{irr.rate}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeSoilPrep}
                      onChange={(e) => setIncludeSoilPrep(e.target.checked)}
                      className="w-4 h-4 accent-green-700 rounded"
                    />
                    <span className="font-semibold text-gray-700">
                      Include Red Soil Grading & Vermicompost Amendment (+₹12/sqft)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Planting Density & Add-ons */}
            <div>
              <h2 className="text-base font-extrabold text-green-950 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <span>Plant Density & Aesthetic Add-ons</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1.5">Plant Density</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "minimal", label: "Lawn Only / Minimal" },
                      { id: "medium", label: "Curated Shrubs & Border" },
                      { id: "dense", label: "Dense Tropical Plants" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlantPreference(p.id)}
                        className={`p-2.5 rounded-xl border text-center transition font-medium ${
                          plantPreference === p.id
                            ? "border-green-600 bg-green-50 text-green-900 font-bold"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-3 border rounded-xl hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includePathway}
                      onChange={(e) => setIncludePathway(e.target.checked)}
                      className="w-4 h-4 accent-green-700 rounded"
                    />
                    <div>
                      <span className="font-bold text-gray-800">Stone Stepping Pathway</span>
                      <span className="block text-[10px] text-gray-500">+₹8,500 Basalt Pavers</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-3 border rounded-xl hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeLighting}
                      onChange={(e) => setIncludeLighting(e.target.checked)}
                      className="w-4 h-4 accent-green-700 rounded"
                    />
                    <div>
                      <span className="font-bold text-gray-800">LED Landscape Spike Lights</span>
                      <span className="block text-[10px] text-gray-500">+₹12,000 Weatherproof</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results & Breakdown Column (Right) */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            <div className="bg-[#142d20] text-white p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-green-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400">
                    Live Calculation
                  </span>
                  <h3 className="text-xl font-bold font-serif">Estimated Project Cost</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-lime-400/20 text-lime-400 flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-10 text-gray-300">
                  <div className="w-6 h-6 border-2 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <span className="text-xs">Computing live rates...</span>
                </div>
              ) : estimateData ? (
                <div className="space-y-5">
                  {/* Total Display */}
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                    <span className="text-xs text-green-200">Total Estimated Budget (incl. GST)</span>
                    <p className="text-3xl font-black text-lime-400 mt-1">
                      ₹{estimateData.totalEstimate.toLocaleString("en-IN")}
                    </p>
                    <span className="text-[11px] text-gray-300 block mt-1">
                      (₹{Math.round(estimateData.totalEstimate / estimateData.areaSqFt)} per sq ft all-inclusive)
                    </span>
                  </div>

                  {/* Itemized Table */}
                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-gray-300 block uppercase tracking-wider text-[10px]">
                      Cost Breakdown
                    </span>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {estimateData.breakdown.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-start text-green-100 py-1 border-b border-white/5 text-[11px]"
                        >
                          <span className="max-w-[70%]">{item.item}</span>
                          <span className="font-bold text-white shrink-0">
                            ₹{item.cost.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Material & Work Schedule Takeoffs */}
                  {estimateData.materialEstimates && (
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                      <span className="font-bold text-lime-300 text-[11px] block">
                        Estimated Material Takeoffs:
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300">
                        <div>
                          <span>Turf Required:</span>{" "}
                          <strong className="text-white">
                            {estimateData.materialEstimates.turfRequiredSqFt} sq ft
                          </strong>
                        </div>
                        <div>
                          <span>Enriched Soil:</span>{" "}
                          <strong className="text-white">
                            {estimateData.materialEstimates.soilBagsEstimated} bags
                          </strong>
                        </div>
                        <div className="col-span-2">
                          <span>Est. Completion Time:</span>{" "}
                          <strong className="text-white">
                            {estimateData.materialEstimates.estimatedWorkDays} to{" "}
                            {estimateData.materialEstimates.estimatedWorkDays + 3} working days
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Transfer to Official Quote Request */}
                  <button
                    onClick={handleTransferToQuote}
                    className="w-full bg-lime-400 hover:bg-lime-300 text-green-950 font-black py-3.5 rounded-2xl shadow-lg transition text-xs flex items-center justify-center gap-2 group"
                  >
                    <span>Request Official Quotation With This Plan</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>

                  <p className="text-[10px] text-gray-400 text-center leading-tight">
                    {estimateData.disclaimer}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
