import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Icons
import { 
  ArrowLeft, 
  Upload, 
  Send, 
  Loader2, 
  Image as ImageIcon, 
  X, 
  Sparkles, 
  Camera, 
  LayoutGrid, 
  Info 
} from 'lucide-react'

// Components & Context
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../context/AuthContext'

const categories = [
  'Garden Designs',
  'Terrace Gardens',
  'Vertical Gardens',
  'Nursery Plants',
  'Landscaping Projects'
]

const AddGallery = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Garden Designs',
    description: ''
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { token } = useAuth()
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image) return setError('Please upload an image for the exhibit.')
    
    setLoading(true)
    setError('')

    const data = new FormData()
    data.append('title', formData.title)
    data.append('category', formData.category)
    data.append('description', formData.description)
    data.append('image', image)

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      })

      if (res.ok) {
        navigate('/admin/gallery')
      } else {
        const errorData = await res.json()
        setError(errorData.message || 'Exhibition failed to launch.')
      }
    } catch (err) {
      setError('Connection to curator lost.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex bg-nature-50 min-h-screen pt-20">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-12">
            <button 
              onClick={() => navigate('/admin/gallery')}
              className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs mb-6 hover:gap-4 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Gallery
            </button>
            <h1 className="text-5xl font-display font-black text-primary-950">New <span className="text-emerald-600 italic">Exhibit.</span></h1>
            <p className="text-gray-400 mt-4 font-medium">Add a new masterpiece to your visual collection.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center gap-3 text-sm font-bold">
              <Info className="w-5 h-5 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Col: Upload */}
            <div className="space-y-8">
               <div className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-nature-50 overflow-hidden relative group">
                  <div className={`aspect-[4/5] rounded-[2.2rem] flex flex-col items-center justify-center transition-all ${imagePreview ? '' : 'bg-nature-50 border-4 border-dashed border-nature-100'}`}>
                     {imagePreview ? (
                       <>
                         <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                         <button 
                          type="button"
                          onClick={() => {setImage(null); setImagePreview(null)}}
                          className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md text-rose-500 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                            <X className="w-5 h-5" />
                         </button>
                       </>
                     ) : (
                       <label className="cursor-pointer flex flex-col items-center gap-6 p-12 text-center">
                          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-primary-200 shadow-xl group-hover:scale-110 transition-transform shadow-nature-200">
                             <Upload className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="text-primary-950 font-black text-lg mb-2">Upload Visual</p>
                            <p className="text-xs text-gray-400 font-medium leading-relaxed">High-resolution JPG, PNG or WEBP<br/>up to 5MB recommended.</p>
                          </div>
                          <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                       </label>
                     )}
                  </div>
               </div>

               <div className="bg-emerald-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                  <div className="relative z-10 flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                        <Camera className="w-6 h-6 text-emerald-400" />
                     </div>
                     <div>
                        <p className="font-black text-xs uppercase tracking-widest text-emerald-400">Curator Tip</p>
                        <p className="text-sm font-medium text-emerald-100/60 leading-relaxed">Landscape shots work best for masonry grids!</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Col: Details */}
            <div className="space-y-6">
               <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-nature-50 space-y-8">
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                       <Sparkles className="w-4 h-4 text-emerald-500" /> Artwork Title
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Moonlight over Terrace"
                      className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/5 font-bold text-primary-950 transition-all"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                       <LayoutGrid className="w-4 h-4 text-emerald-500" /> Collection
                    </label>
                    <select 
                      className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/5 font-bold text-primary-950 transition-all appearance-none cursor-pointer"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                       <Info className="w-4 h-4 text-emerald-500" /> Exhibition Description
                    </label>
                    <textarea 
                      placeholder="Tell the story behind this transformation..."
                      rows={5}
                      className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-emerald-500/5 font-medium text-gray-600 transition-all resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>
               </div>

               <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-primary-950 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-2xl shadow-primary-900/40 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
               >
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                 {loading ? 'Publishing Exhibit...' : 'Launch Masterpiece'}
               </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default AddGallery
