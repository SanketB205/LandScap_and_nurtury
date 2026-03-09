import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Edit } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch services");
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      toast.success("Service deleted successfully");
      fetchServices();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete service");
    }
  };

  return (
    <AdminLayout title="Manage Services" description="View, edit, and delete all services">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 mb-4">No services found. Create your first service!</p>
          <Link
            to="/admin/add-service"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + Add Service
          </Link>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Total: {services.length} Services</h2>
            <Link
              to="/admin/add-service"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              + Add Service
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Slug</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-800">{service.title}</td>
                      <td className="px-6 py-4 text-gray-600">{service.slug}</td>
                      <td className="px-6 py-4 text-center space-x-4">
                        <Link
                          to={`/admin/services/edit/${service._id}`}
                          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                        >
                          <Edit size={18} /> Edit
                        </Link>
                        <button
                          onClick={() => deleteService(service._id)}
                          className="inline-flex items-center gap-2 text-red-600 font-semibold hover:underline"
                        >
                          <Trash2 size={18} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminServices;
