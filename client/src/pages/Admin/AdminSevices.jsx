import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2, Briefcase } from "lucide-react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function AdminServices() {
  const { success, error } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get("/services");
      if (res.data.success) {
        setServices(res.data.data);
      }
    } catch (err) {
      error("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this service?")) return;

    try {
      await api.delete(`/services/${id}`);
      success("Service deleted successfully.");
      fetchServices();
    } catch (err) {
      error(err.message || "Failed to delete service.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-gray-900">
            Services Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage landscaping services, rates, features, and descriptions published on the live site.
          </p>
        </div>

        <Link
          to="/admin/services/add"
          className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </Link>
      </div>

      {/* Services Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-semibold">Loading services...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl p-8 border border-gray-200">
          <p className="text-gray-500 text-sm">No services found in database.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Starting Rate</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={service.bannerImage}
                          alt={service.title}
                          className="w-12 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <strong className="text-gray-900 block font-semibold">{service.title}</strong>
                          <span className="text-[11px] text-gray-400 font-mono">/{service.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">{service.category || "General"}</td>
                    <td className="py-3 px-4 font-bold text-green-900">
                      {service.startingPrice ? `₹${service.startingPrice} /${service.priceUnit || "sq ft"}` : "Custom Quote"}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {service.status || "active"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        to={`/admin/services/edit/${service._id}`}
                        className="p-1.5 inline-block rounded-lg text-gray-500 hover:text-green-800 hover:bg-green-50 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => deleteService(service._id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-700 hover:bg-red-50 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
