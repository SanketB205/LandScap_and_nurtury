import { useState } from "react";
import { Menu, LayoutDashboard, Leaf, Package, Users, Settings, LogOut, MessageCircle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const menu = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
        { name: "Services", icon: Leaf, path: "/admin/services" },
        { name: "Products", icon: Package, path: "/admin/products" },
        { name: "Contacts", icon: MessageCircle, path: "/admin/contacts" },
        { name: "Users", icon: Users, path: "/admin/users" },
        { name: "Settings", icon: Settings, path: "/admin/settings" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/auth");
        toast.success("Logged out successfully");
    };

    const getPageTitle = () => {
        const route = menu.find(m => m.path === location.pathname);
        if (route) return route.name;
        if (location.pathname.includes("add")) return "Add New";
        if (location.pathname.includes("edit")) return "Edit Record";
        return "Admin Portal";
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* SIDEBAR */}
            <aside
                className={`bg-gradient-to-br from-green-800 to-emerald-900 text-white transition-all duration-300 ${sidebarOpen ? "w-72" : "w-20"} shadow-xl relative z-20 flex flex-col`}
            >
                <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                    <h1 className={`font-brand font-bold text-2xl tracking-wide ${!sidebarOpen && "hidden"}`}>
                        <i className="fa-solid fa-leaf text-green-300 mr-2"></i> Janai Admin
                    </h1>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/70 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center">
                        <Menu size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-2 mt-4 flex-1">
                    {menu.map((item, i) => {
                        const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                        return (
                            <Link
                                key={i}
                                to={item.path}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group ${isActive ? "bg-white/20 shadow-inner" : "hover:bg-white/10"}`}
                            >
                                <item.icon size={22} className={`${isActive ? "text-white" : "text-emerald-200 group-hover:text-white"}`} />
                                {sidebarOpen && <span className={`font-semibold ${isActive ? "text-white" : "text-emerald-50 group-hover:text-white"}`}>{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 shrink-0 mb-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-100 hover:text-white transition-all duration-200"
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span className="font-bold">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT WIN */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden max-w-full">
                {/* TOPBAR */}
                <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-emerald-50 px-8 py-5 flex justify-between items-center z-10 shrink-0">
                    <div>
                        <h2 className="text-3xl font-brand font-bold text-gray-800">
                            {getPageTitle()}
                        </h2>
                        <p className="text-gray-500 font-medium text-sm">Manage your platform efficiently</p>
                    </div>
                    <div className="flex items-center gap-4 bg-emerald-50/50 px-4 py-2 rounded-full border border-emerald-100/50 shadow-inner">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-emerald-900 leading-tight">Admin User</p>
                            <p className="text-xs font-semibold text-emerald-600 tracking-widest uppercase">Master</p>
                        </div>
                        <img
                            src="https://i.pravatar.cc/100?u=admin"
                            alt="admin"
                            className="rounded-full w-10 h-10 border-2 border-emerald-200 shadow-sm"
                        />
                    </div>
                </header>

                {/* PAGE DYNAMIC CONTENT */}
                <main className="overflow-y-auto flex-1 relative w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
