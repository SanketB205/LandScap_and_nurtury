import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function AddService() {
  const navigate = useNavigate();
  const { success, error } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "Landscaping",
    startingPrice: 35,
    priceUnit: "per sq ft",
    shortDescription: "",
    intro: "",
    features: "",
    advantages: "",
    bannerImage: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...form,
        features: form.features.split("\n").filter(Boolean),
        advantages: form.advantages.split("\n").filter(Boolean),
      };

      const res = await api.post("/services", payload);
      if (res.data.success) {
        success("Service created and published!");
        navigate("/admin/services");
      }
    } catch (err) {
      error(err.message || "Failed to create service.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/services"
          className="p-2 rounded-xl bg-white border hover:bg-gray-50 text-gray-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black font-serif text-gray-900">Add New Service</h1>
          <p className="text-xs text-gray-500">Publish a new service to the public catalog</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Service Title *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Drip Irrigation Systems"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
            >
              <option value="Landscaping">Landscaping</option>
              <option value="Turf Installation">Turf Installation</option>
              <option value="Garden Maintenance">Garden Maintenance</option>
              <option value="Sports Field">Sports Field</option>
              <option value="Irrigation">Irrigation</option>
              <option value="Nursery">Nursery</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Starting Base Rate (₹)</label>
            <input
              type="number"
              name="startingPrice"
              value={form.startingPrice}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Pricing Unit</label>
            <input
              type="text"
              name="priceUnit"
              placeholder="e.g. per sq ft, per month"
              value={form.priceUnit}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Banner Image URL</label>
          <input
            type="url"
            name="bannerImage"
            value={form.bannerImage}
            onChange={handleChange}
            className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Short Description *</label>
          <textarea
            name="shortDescription"
            rows="2"
            required
            placeholder="Brief 2-line summary for cards..."
            value={form.shortDescription}
            onChange={handleChange}
            className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">In-Depth Introduction</label>
          <textarea
            name="intro"
            rows="3"
            placeholder="Full service overview for the details page..."
            value={form.intro}
            onChange={handleChange}
            className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Features (One per line)
            </label>
            <textarea
              name="features"
              rows="4"
              placeholder="Laser-level grading&#10;Sub-base herringbone drainage&#10;UV-stabilized grass"
              value={form.features}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border border-gray-200 outline-none font-mono"
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Advantages & Benefits (One per line)
            </label>
            <textarea
              name="advantages"
              rows="4"
              placeholder="Zero mud tracking&#10;Water conservation&#10;10-year durability"
              value={form.advantages}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border border-gray-200 outline-none font-mono"
            ></textarea>
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <Link
            to="/admin/services"
            className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold flex items-center gap-2 shadow"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? "Saving..." : "Create Service"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
