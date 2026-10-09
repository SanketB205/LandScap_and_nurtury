import { useState, useEffect } from "react";
import { Settings, Save, CheckCircle, Phone, MapPin, Mail } from "lucide-react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function AdminSettings() {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    companyName: "Janai Landscape Services",
    tagline: "Transform Your Outdoors Into Something Extraordinary",
    phone: "+91 97676 71968",
    email: "contact@janailandscape.com",
    address: "Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune, Maharashtra 411045",
    operatingHours: "Mon–Sat: 8:30 AM – 7:30 PM, Sun: 9:00 AM – 2:00 PM",
    whatsappNumber: "919767671968",
    pricingRules: {
      naturalLawnPerSqFt: 35,
      artificialTurfPerSqFt: 75,
      sportsTurfPerSqFt: 110,
      dripIrrigationPerSqFt: 18,
      sprinklerSystemPerSqFt: 28,
      soilPreparationPerSqFt: 12,
      landscapeDesignBaseRate: 4500,
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/settings");
      if (res.data.success && res.data.data) {
        setForm((prev) => ({
          ...prev,
          ...res.data.data,
          pricingRules: {
            ...prev.pricingRules,
            ...(res.data.data.pricingRules || {}),
          },
        }));
      }
    } catch (err) {
      error("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (field, value) => {
    setForm({
      ...form,
      pricingRules: {
        ...form.pricingRules,
        [field]: Number(value) || 0,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put("/settings", form);
      if (res.data.success) {
        success("Company information & estimator pricing rules updated!");
      }
    } catch (err) {
      error(err.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs font-semibold">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black font-serif text-gray-900">
          Website Settings & Pricing Rules
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Configure live company contact information and modify dynamic calculator rates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Contact Info */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
            Company Profile & Pune Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 mb-1">Pune Office Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Operating Hours</label>
              <input
                type="text"
                value={form.operatingHours}
                onChange={(e) => setForm({ ...form, operatingHours: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">WhatsApp Number (e.g. 919767671968)</label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Pricing Rules for Estimator */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
            Smart Landscape Planner & Estimator Base Rates (₹)
          </h2>
          <p className="text-xs text-gray-500">
            Changing these rates updates the client-side calculator instantly with real database values.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Natural Carpet Grass (₹/sq ft)
              </label>
              <input
                type="number"
                value={form.pricingRules.naturalLawnPerSqFt}
                onChange={(e) => handlePriceChange("naturalLawnPerSqFt", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                35mm Artificial Turf (₹/sq ft)
              </label>
              <input
                type="number"
                value={form.pricingRules.artificialTurfPerSqFt}
                onChange={(e) => handlePriceChange("artificialTurfPerSqFt", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Sports Field Turf (₹/sq ft)
              </label>
              <input
                type="number"
                value={form.pricingRules.sportsTurfPerSqFt}
                onChange={(e) => handlePriceChange("sportsTurfPerSqFt", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Automated Drip Irrigation (₹/sq ft)
              </label>
              <input
                type="number"
                value={form.pricingRules.dripIrrigationPerSqFt}
                onChange={(e) => handlePriceChange("dripIrrigationPerSqFt", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Pop-up Sprinklers (₹/sq ft)
              </label>
              <input
                type="number"
                value={form.pricingRules.sprinklerSystemPerSqFt}
                onChange={(e) => handlePriceChange("sprinklerSystemPerSqFt", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Soil Prep & Red Soil (₹/sq ft)
              </label>
              <input
                type="number"
                value={form.pricingRules.soilPreparationPerSqFt}
                onChange={(e) => handlePriceChange("soilPreparationPerSqFt", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                3D CAD Design Base Rate (₹)
              </label>
              <input
                type="number"
                value={form.pricingRules.landscapeDesignBaseRate}
                onChange={(e) => handlePriceChange("landscapeDesignBaseRate", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Settings & Pricing"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
