import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  PlusCircle, 
  ArrowLeft,
  Paintbrush,
  BookOpen,
  Camera
} from 'lucide-react'

const AdminSidebar = () => {
  const menuItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/services', label: 'Services', icon: Paintbrush },
    { to: '/admin/blogs', label: 'Manage Blogs', icon: BookOpen },
    { to: '/admin/gallery', label: 'Manage Gallery', icon: Camera },
    { to: '/admin/add-product', label: 'Add Product', icon: PlusCircle },
    { to: '/admin/add-service', label: 'Add Service', icon: PlusCircle },
    { to: '/admin/add-blog', label: 'Add Blog', icon: PlusCircle },
    { to: '/admin/add-gallery', label: 'Add Artwork', icon: PlusCircle },
    { to: '/admin/orders', label: 'Orders (Soon)', icon: ShoppingBag, disabled: true },
    { to: '/admin/users', label: 'Users (Soon)', icon: Users, disabled: true },
  ]

  return (
    <aside className="w-64 bg-primary-900 text-white min-h-screen sticky top-0 flex flex-col shadow-2xl">
      <div className="p-8 border-b border-primary-800">
        <h2 className="text-xl font-serif font-bold text-primary-100 flex items-center gap-2">
          Admin <span className="text-sm bg-primary-700 px-2 py-0.5 rounded text-white font-sans uppercase">Panel</span>
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          item.disabled ? (
            <div key={item.label} className="flex items-center gap-3 px-4 py-3 text-nature-500 cursor-not-allowed opacity-50">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? 'bg-primary-700 text-white shadow-lg'
                    : 'text-primary-400 hover:text-white hover:bg-primary-800'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          )
        ))}
      </nav>

      <div className="p-4 border-t border-primary-800">
        <NavLink 
          to="/" 
          className="flex items-center gap-3 px-4 py-3 text-primary-400 hover:text-white hover:bg-primary-800 rounded-xl transition-all font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Site</span>
        </NavLink>
      </div>
    </aside>
  )
}

export default AdminSidebar
