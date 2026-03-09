import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import slugify from "slugify";
import AdminLayout from "../../components/AdminLayout";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/services`);
      const service = res.data.find((s) => s._id === id);
      
      if (service) {
        setForm({
          ...service,
          features: Array.isArray(service.features) ? service.features.join("\n") : service.features,
          advantages: Array.isArray(service.advantages) ? service.advantages.join("\n") : service.advantages,
        });
      } else {
        toast.error("Service not found");
        navigate("/admin/services");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load service");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.shortDescription) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: slugify(form.title, { lower: true }),
        features: form.features.split("\n").filter(f => f.trim()),
        advantages: form.advantages.split("\n").filter(a => a.trim()),
      };

      await axios.put(`http://localhost:5000/api/services/${id}`, payload);
      toast.success("Service Updated Successfully");
      navigate("/admin/services");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update service");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Service" description="Update service details">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
            <p className="mt-4 text-gray-600">Loading service...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!form) {
    return (
      <AdminLayout title="Edit Service" description="Update service details">
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600">Service not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Service" description="Update service details">
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
                placeholder="Service title"
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
              disabled={saving}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {saving ? "Updating Service..." : "Update Service"}
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

export default EditService;
