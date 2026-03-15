import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Icons
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2, 
  Filter,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react'

// Components & Context
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../context/AuthContext'

const AdminServices = () => {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { token } = useAuth()

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    let result = services
    if (selectedCategory !== 'All') {
      result = result.filter(s => s.category === selectedCategory)
    }
    if (searchTerm) {
      result = result.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredServices(result)
  }, [searchTerm, selectedCategory, services])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services')
      const data = await res.json()
      if (res.ok) {
        setServices(data)
      }
    } catch (err) {
      console.error('Error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this service? This will delete all associated images.')) return

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        setServices(services.filter(s => s._id !== id))
      } else {
        const data = await res.json()
        alert(data.message || 'Failed to delete service')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('An error occurred while deleting')
    }
  }

  return (
    <div className="flex min-h-screen bg-nature-50 pt-20">
      <AdminSidebar active="services" />
      
      <main className="flex-1 p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-serif font-black text-primary-950 mb-2">Service Projects</h1>
            <p className="text-primary-600 font-medium">Manage your landscaping portfolio and gallery</p>
          </div>
          <Link 
            to="/admin/add-service" 
            className="flex items-center gap-2 bg-primary-800 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-900 transition-all shadow-xl shadow-primary-900/10 active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add New Service
          </Link>
        </header>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-nature-100 flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300 group-focus-within:text-primary-700 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-60 group">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300 group-focus-within:text-primary-700 transition-colors" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium appearance-none"
              >
                <option value="All">All Categories</option>
                <option value="Gallery">Gallery</option>
                <option value="Garden Designs">Garden Designs</option>
                <option value="Terrace Gardens">Terrace Gardens</option>
                <option value="Vertical Gardens">Vertical Gardens</option>
                <option value="Nursery Plants">Nursery Plants</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-nature-100 overflow-hidden">
          {loading ? (
            <div className="p-24 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-primary-700 animate-spin mb-4" />
              <p className="text-primary-900 font-bold italic">Scanning portfolio...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="p-24 text-center">
              <div className="w-20 h-20 bg-nature-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-8 h-8 text-primary-200" />
              </div>
              <h3 className="text-2xl font-serif font-black text-primary-950 mb-2">No projects found</h3>
              <p className="text-primary-500 font-medium max-w-xs mx-auto mb-8">Ready to showcase your masterpieces? Add your first service project.</p>
              <Link to="/admin/add-service" className="text-primary-700 font-black text-sm uppercase tracking-widest hover:underline">
                Start Creating
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-nature-50 border-b border-nature-100">
                    <th className="px-8 py-6 text-[10px] font-black text-primary-400 uppercase tracking-widest">Image</th>
                    <th className="px-8 py-6 text-[10px] font-black text-primary-400 uppercase tracking-widest">Project Title</th>
                    <th className="px-8 py-6 text-[10px] font-black text-primary-400 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-6 text-[10px] font-black text-primary-400 uppercase tracking-widest">Gallery</th>
                    <th className="px-8 py-6 text-[10px] font-black text-primary-400 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-6 text-[10px] font-black text-primary-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nature-100">
                  {filteredServices.map((service) => (
                    <tr key={service._id} className="hover:bg-nature-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="w-16 h-12 rounded-xl overflow-hidden bg-nature-100 shadow-sm border border-white">
                          <img src={service.images?.[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-serif font-bold text-primary-950 text-lg group-hover:text-primary-700 transition-colors">{service.title}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 bg-white border border-nature-200 text-primary-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {service.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex items-center gap-2 text-primary-900 font-black">
                          <ImageIcon className="w-4 h-4 text-primary-300" />
                          {service.images?.length || 0}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs font-bold text-primary-400 uppercase tracking-tighter">
                          {new Date(service.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-3">
                          <Link 
                            to={`/services/${service._id}`} 
                            target="_blank"
                            className="p-3 bg-nature-50 text-primary-400 hover:text-primary-700 rounded-2xl transition-all"
                            title="View Live"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <Link 
                            to={`/admin/edit-service/${service._id}`} 
                            className="p-3 bg-primary-50 text-primary-400 hover:text-primary-700 rounded-2xl transition-all"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(service._id)}
                            className="p-3 bg-red-50 text-red-300 hover:text-red-500 rounded-2xl transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminServices
