import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch services");
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
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
    <div className="p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          Manage Services
        </h1>

        <Link
          to="/admin/services/add"
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add Service
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-gray-500">No services found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="p-3">Title</th>
                <th className="p-3">Slug</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {services.map((s) => (
                <tr
                  key={s._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">
                    {s.title}
                  </td>

                  <td className="p-3 text-gray-600">
                    {s.slug}
                  </td>

                  <td className="p-3 text-center space-x-4">
                    <Link
                      to={`/admin/services/edit/${s._id}`}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteService(s._id)}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
