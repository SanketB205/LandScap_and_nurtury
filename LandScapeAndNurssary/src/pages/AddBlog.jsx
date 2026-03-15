import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Icons
import { 
  ArrowLeft, 
  Upload, 
  Send, 
  Loader2, 
  Image as ImageIcon, 
  X, 
  Hash, 
  BookText, 
  AlignLeft, 
  Tags 
} from 'lucide-react'

// Components & Context
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../context/AuthContext'

const AddBlog = () => {
  const [blog, setBlog] = useState({
    title: '',
    category: 'Plant Care',
    excerpt: '',
    content: '',
    readTime: '5 min read',
    tags: ''
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const { user, token } = useAuth()

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image) return alert('Please upload a blog image')

    setLoading(true)
    const formData = new FormData()
    formData.append('title', blog.title)
    formData.append('category', blog.category)
    formData.append('excerpt', blog.excerpt)
    formData.append('content', blog.content)
    formData.append('readTime', blog.readTime)
    
    // Convert tags string to array of strings
    const tagsArray = blog.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    formData.append('tags', JSON.stringify(tagsArray))
    formData.append('image', image)

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      if (res.ok) {
        navigate('/admin/blogs')
      } else {
        const error = await res.json()
        alert(error.message)
      }
    } catch (err) {
      console.error('Error creating blog:', err)
      alert('Failed to publish blog')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex bg-nature-50 min-h-screen pt-20">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center gap-8 mb-12">
           <button 
            onClick={() => navigate('/admin/blogs')}
            className="w-14 h-14 rounded-2xl bg-white border border-nature-100 flex items-center justify-center text-primary-950 hover:bg-primary-50 transition-all shadow-sm"
           >
              <ArrowLeft className="w-5 h-5" />
           </button>
           <div>
              <p className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2">Editor Suite</p>
              <h1 className="text-5xl font-display font-black text-primary-950">Publish New <span className="text-emerald-600">Story</span></h1>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
           
           {/* Left: Main Content */}
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-nature-50 space-y-8">
                 
                 {/* Title */}
                 <div>
                    <label className="flex items-center gap-2 text-xs font-black text-primary-900 uppercase tracking-widest mb-4">
                       <BookText className="w-3.5 h-3.5 text-emerald-500" /> Blog Title
                    </label>
                    <input 
                      type="text"
                      name="title"
                      value={blog.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g., 10 Indoor Plants for Stress Relief"
                      className="w-full px-0 py-2 border-b-2 border-nature-100 bg-transparent text-3xl font-display font-black text-primary-950 placeholder-gray-200 focus:border-emerald-500 outline-none transition-all pb-6"
                    />
                 </div>

                 {/* Excerpt */}
                 <div>
                    <label className="flex items-center gap-2 text-xs font-black text-primary-900 uppercase tracking-widest mb-4">
                       <AlignLeft className="w-3.5 h-3.5 text-emerald-500" /> Short Excerpt
                    </label>
                    <textarea 
                      name="excerpt"
                      value={blog.excerpt}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="A brief summary for the preview card..."
                      className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-400 font-medium text-sm transition-all"
                    />
                 </div>

                 {/* Full Content */}
                 <div>
                    <label className="flex items-center gap-2 text-xs font-black text-primary-900 uppercase tracking-widest mb-4">
                       <BookText className="w-3.5 h-3.5 text-emerald-500" /> Article Content
                    </label>
                    <textarea 
                      name="content"
                      value={blog.content}
                      onChange={handleChange}
                      required
                      rows={12}
                      placeholder="Start writing your green story here..."
                      className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-400 font-medium text-sm transition-all leading-relaxed whitespace-pre-wrap"
                    />
                 </div>
              </div>
           </div>

           {/* Right: Sidebar Info */}
           <div className="space-y-8">
              
              {/* Image Upload */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-nature-50">
                 <label className="flex items-center gap-2 text-xs font-black text-primary-900 uppercase tracking-widest mb-6">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-500" /> Cover Image
                 </label>
                 
                 {imagePreview ? (
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4 group">
                       <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                       <button 
                        type="button"
                        onClick={() => { setImage(null); setImagePreview('') }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                          <X className="w-4 h-4" />
                       </button>
                    </div>
                 ) : (
                    <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-nature-100 rounded-3xl bg-nature-50/50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all cursor-pointer mb-4">
                       <Upload className="w-8 h-8 text-emerald-400 mb-2" />
                       <span className="text-xs font-bold text-gray-500">Click to upload</span>
                       <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                 )}
                 <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">Recommended: 1600 x 900px</p>
              </div>

              {/* Categorization */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-nature-50 space-y-6">
                 <div>
                    <label className="block text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] mb-3">Category</label>
                    <select 
                      name="category"
                      value={blog.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-nature-50 border border-nature-100 rounded-xl font-black text-xs uppercase tracking-widest text-primary-900 outline-none focus:ring-2 focus:ring-emerald-500/10"
                    >
                       <option value="Plant Care">Plant Care</option>
                       <option value="Garden Design">Garden Design</option>
                       <option value="Plant Science">Plant Science</option>
                       <option value="Seasonal Guide">Seasonal Guide</option>
                    </select>
                 </div>

                 <div>
                    <label className="block text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] mb-3">Read Time</label>
                    <input 
                      type="text"
                      name="readTime"
                      value={blog.readTime}
                      onChange={handleChange}
                      placeholder="e.g., 5 min read"
                      className="w-full px-4 py-3 bg-nature-50 border border-nature-100 rounded-xl font-bold text-xs text-primary-900 outline-none focus:ring-2 focus:ring-emerald-500/10"
                    />
                 </div>

                 <div>
                    <label className="flex items-center gap-2 text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] mb-3">
                       <Tags className="w-3 h-3" /> Tags (Comma separated)
                    </label>
                    <input 
                      type="text"
                      name="tags"
                      value={blog.tags}
                      onChange={handleChange}
                      placeholder="e.g., houseplant, tips, relax"
                      className="w-full px-4 py-3 bg-nature-50 border border-nature-100 rounded-xl font-bold text-xs text-primary-900 outline-none focus:ring-2 focus:ring-emerald-500/10"
                    />
                 </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-700 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/20 hover:bg-emerald-800 transition-all disabled:opacity-50 active:scale-95"
              >
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                 Publish Story
              </button>
           </div>
        </form>

      </main>
    </div>
  )
}

export default AddBlog
