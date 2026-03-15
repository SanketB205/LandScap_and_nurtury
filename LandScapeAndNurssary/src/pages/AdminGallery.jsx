import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Icons
import { 
  Plus, 
  Search, 
  Trash2, 
  Camera, 
  ArrowLeft, 
  Loader2, 
  Image as ImageIcon,
  LayoutGrid, 
  Filter, 
  ExternalLink
} from 'lucide-react'

// Components & Context
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../context/AuthContext'

const AdminGallery = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      if (res.ok) {
        setItems(data)
      }
    } catch (err) {
      console.error('Error fetching gallery:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Erase this artwork from the gallery? This cannot be undone.')) return

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        setItems(items.filter(item => item._id !== id))
      }
    } catch (err) {
      console.error('Error deleting gallery item:', err)
    }
  }

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex bg-nature-50 min-h-screen pt-20">
      <AdminSidebar />
      <main className="flex-1 p-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4 text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">
               <ArrowLeft className="w-4 h-4 cursor-pointer" onClick={() => navigate('/admin')} />
               Curation Suit
            </div>
            <h1 className="text-5xl font-display font-black text-primary-950">Visual <span className="text-emerald-600">Gallery</span></h1>
          </div>
          <Link 
            to="/admin/add-gallery" 
            className="flex items-center gap-3 bg-primary-950 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-xl shadow-primary-900/20 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Add Artwork
          </Link>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-nature-50 mb-8 flex flex-col md:flex-row items-center gap-4">
           <div className="relative flex-1 w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search artworks or collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 font-medium text-sm transition-all"
              />
           </div>
           <div className="flex items-center gap-2">
              <div className="px-6 py-2 bg-emerald-50 rounded-xl text-emerald-700 text-xs font-black uppercase tracking-widest">
                 {filteredItems.length} Exhibits
              </div>
              <button 
                className="p-3 bg-white border border-nature-100 rounded-xl text-gray-400 hover:text-primary-950 transition-colors"
                onClick={fetchGallery}
              >
                 <Loader2 className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
           </div>
        </div>

        {/* Table/List */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-nature-50 overflow-hidden">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-10 h-10 text-primary-700 animate-spin mb-4" />
                <p className="text-gray-400 font-medium">Loading collection...</p>
             </div>
          ) : filteredItems.length === 0 ? (
             <div className="text-center py-32">
                <div className="w-20 h-20 bg-nature-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <ImageIcon className="w-8 h-8 text-primary-200" />
                </div>
                <h3 className="text-2xl font-display font-black text-primary-950 mb-2">Portfolio is empty</h3>
                <p className="text-gray-400 italic">"Design is the silent ambassador of your brand." - Paul Rand</p>
                <Link to="/admin/add-gallery" className="inline-block mt-8 text-emerald-600 font-black text-xs uppercase tracking-widest border-b-2 border-emerald-600 pb-1">Begin Curating</Link>
             </div>
          ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-nature-50/50 border-b border-nature-50">
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-500">Artwork</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-500">Collection</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-500">Exhibit Date</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-500 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-nature-50">
                      {filteredItems.map((item) => (
                         <tr key={item._id} className="hover:bg-nature-50/30 transition-colors group">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm bg-nature-100">
                                     <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                  </div>
                                  <div className="max-w-[300px]">
                                     <p className="font-black text-primary-950 text-base mb-1 group-hover:text-emerald-700 transition-colors line-clamp-1">{item.title}</p>
                                     <p className="text-xs text-gray-400 line-clamp-1 italic font-medium">{item.description}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center gap-2 w-fit">
                                  <Filter className="w-3 h-3" /> {item.category}
                               </span>
                            </td>
                            <td className="px-8 py-6">
                               <p className="text-xs font-bold text-primary-950">{new Date(item.createdAt).toLocaleDateString()}</p>
                               <span className="text-[10px] uppercase font-black text-gray-400 tracking-tighter italic">Added to archive</span>
                            </td>
                            <td className="px-8 py-6 text-right">
                               <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                  <a 
                                    href={item.image} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="p-3 bg-white hover:bg-nature-50 text-gray-400 hover:text-primary-950 border border-nature-100 rounded-xl transition-all shadow-md"
                                  >
                                     <ExternalLink className="w-4 h-4" />
                                  </a>
                                  <button 
                                    onClick={() => handleDelete(item._id)}
                                    className="p-3 bg-white hover:bg-rose-50 text-primary-400 hover:text-rose-500 border border-nature-100 rounded-xl transition-all shadow-md"
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

export default AdminGallery
