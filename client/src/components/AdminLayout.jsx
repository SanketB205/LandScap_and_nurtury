import { useState } from "react";
import { Menu, X, LogOut, Settings, LayoutDashboard, Leaf, MessageCircle, Users, File } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminLayout = ({ children, title, description }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { logout, userName } = useAuth();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Services", icon: Leaf, path: "/admin/services" },
    { name: "Contacts", icon: MessageCircle, path: "/admin/contacts" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/auth");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside
        className={`bg-gradient-to-b from-green-900 to-green-800 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } fixed h-screen shadow-xl overflow-y-auto z-40`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <h1 className={`font-bold text-xl tracking-wide ${!sidebarOpen && "hidden"}`}>
            🌿 Admin
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-green-700 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-green-700 transition duration-200 group"
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && (
                <span className="font-medium group-hover:translate-x-1 transition-transform">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition duration-200 text-white"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* HEADER */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-green-800">{title}</h2>
              {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-medium">👤 {userName || "Admin"}</span>
              <img
                src={`https://i.pravatar.cc/40?u=${userName}`}
                alt="admin"
                className="w-10 h-10 rounded-full border-2 border-green-500"
              />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
