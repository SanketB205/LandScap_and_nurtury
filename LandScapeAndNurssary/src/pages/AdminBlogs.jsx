import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Icons
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Calendar, 
  Heart, 
  MessageCircle, 
  ArrowLeft, 
  Loader2, 
  BookOpen 
} from 'lucide-react'

// Components & Context
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../context/AuthContext'

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { user, token } = useAuth()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs')
      const data = await res.json()
      if (res.ok) {
        setBlogs(data)
      }
    } catch (err) {
      console.error('Error fetching blogs:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        setBlogs(blogs.filter(b => b._id !== id))
      }
    } catch (err) {
      console.error('Error deleting blog:', err)
    }
  }

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
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
               Admin Dashboard
            </div>
            <h1 className="text-5xl font-display font-black text-primary-950">Manage <span className="text-emerald-600">Blogs</span></h1>
          </div>
          <Link 
            to="/admin/add-blog" 
            className="flex items-center gap-3 bg-primary-950 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-xl shadow-primary-900/20 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Add New Blog
          </Link>
        </div>

        {/* Filters/Search */}
        <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-nature-50 mb-8 flex flex-col md:flex-row items-center gap-4">
           <div className="relative flex-1 w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by title or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 font-medium text-sm transition-all"
              />
           </div>
           <div className="px-6 py-2 bg-emerald-50 rounded-xl text-emerald-700 text-xs font-black uppercase tracking-widest">
              {filteredBlogs.length} Articles Total
           </div>
        </div>

        {/* Blog Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-nature-50 overflow-hidden">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-10 h-10 text-primary-700 animate-spin mb-4" />
                <p className="text-gray-400 font-medium">Gathering your stories...</p>
             </div>
          ) : filteredBlogs.length === 0 ? (
             <div className="text-center py-32">
                <div className="w-20 h-20 bg-nature-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <BookOpen className="w-8 h-8 text-primary-200" />
                </div>
                <h3 className="text-2xl font-display font-black text-primary-950 mb-2">No blogs found</h3>
                <p className="text-gray-400">Time to plant some seeds of knowledge!</p>
             </div>
          ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-nature-50 border-b border-nature-100">
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-500">Blog Info</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-500">Stats</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-500">Date</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-nature-500 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-nature-50">
                      {filteredBlogs.map((blog) => (
                         <tr key={blog._id} className="hover:bg-nature-50/50 transition-colors group">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                                     <img src={blog.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                  </div>
                                  <div>
                                     <p className="font-black text-primary-950 text-sm mb-1 group-hover:text-emerald-700 transition-colors line-clamp-1">{blog.title}</p>
                                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">{blog.category}</span>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4 text-gray-500">
                                  <div className="flex items-center gap-1.5 bg-nature-50 px-3 py-1.5 rounded-xl">
                                     <Heart className="w-3.5 h-3.5 text-rose-500" />
                                     <span className="text-xs font-black">{blog.likes.length}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 bg-nature-50 px-3 py-1.5 rounded-xl">
                                     <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                                     <span className="text-xs font-black">{blog.comments.length}</span>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-2 text-gray-400">
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span className="text-xs font-medium">{new Date(blog.createdAt).toLocaleDateString()}</span>
                               </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                               <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button 
                                    onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                                    className="p-3 bg-white hover:bg-emerald-50 text-primary-700 hover:text-emerald-700 border border-nature-100 rounded-xl transition-all shadow-md"
                                  >
                                     <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleDelete(blog._id)}
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

export default AdminBlogs
