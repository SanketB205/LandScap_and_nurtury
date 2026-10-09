import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Sprout,
  Image,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function AdminLayout() {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { info } = useToast();

  const handleLogout = async () => {
    await logout();
    info("Logged out from Admin Dashboard");
    navigate("/auth");
  };

  const navItems = [
    { label: "Dashboard Overview", path: "/admin", icon: LayoutDashboard },
    { label: "Inquiries & Leads", path: "/admin/inquiries", icon: Inbox },
    { label: "Services Management", path: "/admin/services", icon: Briefcase },
    { label: "Nursery Catalog", path: "/admin/plants", icon: Sprout },
    { label: "Portfolio Projects", path: "/admin/projects", icon: Image },
    { label: "Digital Quotations", path: "/admin/quotations", icon: FileText },
    { label: "Pricing & Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#142d20] text-gray-200 flex flex-col justify-between p-5 border-r border-green-950 shrink-0">
        <div className="space-y-6">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 pb-4 border-b border-green-800">
            <div className="w-9 h-9 rounded-xl bg-lime-400 text-green-950 flex items-center justify-center font-bold text-lg">
              🌿
            </div>
            <div>
              <span className="block text-sm font-black text-white font-serif tracking-tight">
                Janai Landscape
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-lime-400">
                Admin Management Portal
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-lime-400 text-green-950 font-bold shadow-md"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer */}
        <div className="pt-6 border-t border-green-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-white text-xs">{user?.name || "Administrator"}</p>
              <span className="text-[10px] text-lime-400 font-semibold uppercase">Super Admin</span>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-red-900/50 text-gray-300 hover:text-red-300 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-1.5 w-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold py-2 rounded-xl transition"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 py-3.5 px-6 sm:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-gray-800">Admin Control</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-green-700 font-bold capitalize">
              {location.pathname.replace("/admin", "").replace("/", "") || "Overview"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-800 text-[11px] font-bold px-3 py-1 rounded-full border border-green-200">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span>Production Authenticated</span>
            </span>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="p-6 sm:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
