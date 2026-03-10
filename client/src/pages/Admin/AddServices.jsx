import { useState } from "react";
import axios from "axios";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";

const AddService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    intro: "",
    features: "",
    advantages: "",
    bannerImage: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title || !form.shortDescription) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        slug: slugify(form.title, { lower: true }),
        features: form.features.split("\n").filter(f => f.trim()),
        advantages: form.advantages.split("\n").filter(a => a.trim()),
      };

      await axios.post("http://localhost:5000/api/services", payload);
      toast.success("Service Added Successfully");
      
      // Navigate back to services page
      navigate("/admin/services");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add New Service" description="Create a new landscaping or nursery service">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Form Content */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">Service Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Artificial Grass Installation"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {/* Short Description */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">Short Description *</label>
              <textarea
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="Brief description of the service"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {/* Introduction */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">Introduction</label>
              <textarea
                name="intro"
                value={form.intro}
                onChange={handleChange}
                placeholder="Detailed introduction to the service"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Features */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">Features</label>
              <textarea
                name="features"
                value={form.features}
                onChange={handleChange}
                placeholder="Enter features (one per line)"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Enter each feature on a new line</p>
            </div>

            {/* Advantages */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">Advantages</label>
              <textarea
                name="advantages"
                value={form.advantages}
                onChange={handleChange}
                placeholder="Enter advantages (one per line)"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Enter each advantage on a new line</p>
            </div>

            {/* Banner Image URL */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">Banner Image URL</label>
              <input
                type="url"
                name="bannerImage"
                value={form.bannerImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Adding Service..." : "Add Service"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/services")}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddService;
