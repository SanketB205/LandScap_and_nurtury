import { useState, useEffect } from "react";
import { Leaf, MessageCircle, Users, Eye, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AdminLayout from "../../components/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    contacts: 0,
    users: 0,
  });
  const [recentServices, setRecentServices] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch Services
      const servicesRes = await axios.get("http://localhost:5000/api/services");
      const services = servicesRes.data || [];
      setRecentServices(services.slice(0, 5));
      
      // Fetch Contact Messages
      const contactsRes = await axios.get("http://localhost:5000/api/contactus");
      const contacts = contactsRes.data || [];
      setRecentContacts(contacts.slice(0, 5));

      // Update Stats
      setStats({
        services: services.length,
        contacts: contacts.length,
        users: 1,
      });

      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      toast.error("Failed to load dashboard data");
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`http://localhost:5000/api/services/${id}`);
        toast.success("Service deleted");
        fetchDashboardData();
      } catch (err) {
        toast.error("Failed to delete service");
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard" description="Welcome to your admin dashboard">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard" description="Welcome to your admin dashboard">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Services</h3>
              <p className="text-4xl font-bold text-green-800 mt-2">{stats.services}</p>
            </div>
            <Leaf className="text-green-600" size={40} />
          </div>
          <Link to="/admin/services" className="text-green-600 text-sm mt-4 font-semibold hover:underline inline-block">
            View All →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Contact Messages</h3>
              <p className="text-4xl font-bold text-blue-600 mt-2">{stats.contacts}</p>
            </div>
            <MessageCircle className="text-blue-500" size={40} />
          </div>
          <Link to="/admin/contacts" className="text-blue-600 text-sm mt-4 font-semibold hover:underline inline-block">
            Check Messages →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Registered Users</h3>
              <p className="text-4xl font-bold text-purple-600 mt-2">{stats.users}</p>
            </div>
            <Users className="text-purple-500" size={40} />
          </div>
          <Link to="/admin/users" className="text-purple-600 text-sm mt-4 font-semibold hover:underline inline-block">
            Manage Users →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-green-800 mb-4">⚡ Quick Actions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/add-service"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-lg text-center font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add Service
          </Link>

          <Link
            to="/admin/services"
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white p-4 rounded-lg text-center font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Eye size={20} /> View Services
          </Link>

          <Link
            to="/admin/contacts"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-lg text-center font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} /> Messages
          </Link>

          <Link
            to="/admin/settings"
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-4 rounded-lg text-center font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Settings
          </Link>
        </div>
      </div>

      {/* Recent Services & Contacts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-green-800 mb-4">📋 Recent Services</h3>
          {recentServices.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No services yet</p>
          ) : (
            <div className="space-y-3">
              {recentServices.map((service) => (
                <div key={service._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{service.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{service.shortDescription}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link
                        to={`/admin/services/edit/${service._id}`}
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded transition"
                        title="Edit"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => deleteService(service._id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/admin/services" className="text-green-600 font-semibold mt-4 inline-block hover:underline">
            View All Services →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">💬 Recent Messages</h3>
          {recentContacts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No messages yet</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <div key={contact._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                  <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{contact.message}</p>
                </div>
              ))}
            </div>
          )}
          <Link to="/admin/contacts" className="text-blue-600 font-semibold mt-4 inline-block hover:underline">
            View All Messages →
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
