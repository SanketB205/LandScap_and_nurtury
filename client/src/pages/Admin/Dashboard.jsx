import { useState, useEffect } from "react";
import { Menu, LayoutDashboard, Leaf, FileText, Image, Users, Settings, LogOut, MessageCircle, Eye, Trash2, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    services: 0,
    contacts: 0,
    users: 0,
  });
  const [recentServices, setRecentServices] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Services", icon: Leaf, path: "/admin/services" },
    { name: "Add Service", icon: Plus, path: "/admin/add-service" },
    { name: "Contacts", icon: MessageCircle, path: "/admin/contacts" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

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
        users: 1, // You can fetch actual user count from backend
      });

      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      toast.error("Failed to load dashboard data");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login");
    toast.success("Logged out successfully");
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside
        className={`bg-gradient-to-b from-green-900 to-green-800 text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <h1 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>
            🌿 Admin
          </h1>
          <Menu
            className="cursor-pointer hover:text-green-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>

        <nav className="p-4 space-y-2">
          {menu.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition duration-200"
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-40 flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition duration-200 text-white"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-green-800">
              Greenland Nursery Admin
            </h2>
            <p className="text-sm text-gray-500">Welcome to your dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">Admin User</span>
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="admin"
              className="rounded-full w-10 h-10 border-2 border-green-500"
            />
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="p-6 overflow-auto">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition">
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

            <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
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

            <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition">
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
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">⚡ Quick Actions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/admin/add-service"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-xl text-center font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Plus size={20} /> Add Service
              </Link>

              <Link
                to="/admin/services"
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white p-4 rounded-xl text-center font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Eye size={20} /> View Services
              </Link>

              <Link
                to="/admin/contacts"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-xl text-center font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} /> Messages
              </Link>

              <Link
                to="/admin/settings"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-4 rounded-xl text-center font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Settings size={20} /> Settings
              </Link>
            </div>
          </div>

          {/* Recent Services */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
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
                          <span className="text-xs inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            {service.status || "active"}
                          </span>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Link
                            to={`/admin/services/edit/${service._id}`}
                            className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                            title="Edit"
                          >
                            ✏️
                          </Link>
                          <button
                            onClick={() => deleteService(service._id)}
                            className="text-red-600 hover:bg-red-50 p-2 rounded"
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
              <Link
                to="/admin/services"
                className="text-green-600 font-semibold mt-4 inline-block hover:underline"
              >
                View All Services →
              </Link>
            </div>

            {/* Recent Contacts */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-4">💬 Recent Messages</h3>
              {recentContacts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No messages yet</p>
              ) : (
                <div className="space-y-3">
                  {recentContacts.map((contact) => (
                    <div key={contact._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{contact.message}</p>
                          <span className="text-xs inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {contact.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Link
                to="/admin/contacts"
                className="text-blue-600 font-semibold mt-4 inline-block hover:underline"
              >
                View All Messages →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
