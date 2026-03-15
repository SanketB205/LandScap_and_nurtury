import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Icons
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Plus, 
  ImageIcon, 
  Loader2,
  AlertCircle
} from 'lucide-react'

// Components & Context
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../context/AuthContext'

const AddService = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Garden Designs',
  })
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([...images, ...files])

    const newPreviews = files.map(file => URL.createObjectURL(file))
    setPreviews([...previews, ...newPreviews])
  }

  const removeImage = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newPreviews = [...previews]
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (images.length === 0) {
      setError('Please upload at least one image')
      return
    }

    setLoading(true)
    setError('')

    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('category', formData.category)
    images.forEach(image => {
      data.append('images', image)
    })

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      })

      const resData = await res.json()
      if (res.ok) {
        navigate('/admin/services')
      } else {
        setError(resData.message || 'Failed to create service')
      }
    } catch (err) {
      console.error('Submit error:', err)
      setError('An error occurred while submitting')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-nature-50 pt-20">
      <AdminSidebar active="services" />
      
      <main className="flex-1 p-8">
        <header className="mb-12">
          <Link to="/admin/services" className="flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-widest mb-6 hover:gap-4 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-4xl font-serif font-black text-primary-950">Add <span className="text-primary-700 italic">New Project</span></h1>
        </header>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-nature-100">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-primary-700 uppercase tracking-widest ml-1">Service Title</label>
                  <input 
                    type="text" 
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Luxury Terrace Garden Design"
                    className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-primary-700 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium appearance-none"
                  >
                    <option value="Garden Designs">Garden Designs</option>
                    <option value="Terrace Gardens">Terrace Gardens</option>
                    <option value="Vertical Gardens">Vertical Gardens</option>
                    <option value="Nursery Plants">Nursery Plants</option>
                    <option value="Gallery">Gallery</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-primary-700 uppercase tracking-widest ml-1">Detailed Description</label>
                  <textarea 
                    name="description"
                    required
                    rows="8"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the scope, materials used, and the vision of this project..."
                    className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium resize-none leading-relaxed"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-nature-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-serif font-black text-primary-950">Visual Assets</h3>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Upload up to 10 project images</p>
                </div>
                <label className="cursor-pointer flex items-center gap-2 bg-primary-100 text-primary-800 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-200 transition-all">
                  <Plus className="w-4 h-4" /> Add Images
                  <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>

              {previews.length === 0 ? (
                <div className="border-2 border-dashed border-nature-100 rounded-[2rem] p-20 flex flex-col items-center justify-center text-center">
                   <div className="w-20 h-20 bg-nature-50 rounded-full flex items-center justify-center mb-6">
                      <ImageIcon className="w-8 h-8 text-primary-200" />
                   </div>
                   <p className="text-primary-900 font-bold italic mb-2">No imagery uploaded yet</p>
                   <p className="text-gray-400 text-xs max-w-xs leading-relaxed">Showcase the transformation with high-quality photos from multiple angles.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {previews.map((preview, idx) => (
                    <div key={idx} className="relative aspect-square rounded-[2rem] overflow-hidden group border-4 border-white shadow-md">
                      <img src={preview} alt="" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed border-nature-100 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-nature-50 transition-all text-primary-300 hover:text-primary-700">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Upload More</span>
                    <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                </div>
              )}
            </div>
          </div>

          <aside className="sticky top-8 space-y-6">
            <div className="bg-primary-950 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary-950/40">
              <h4 className="text-xl font-serif font-black mb-6">Publish Service</h4>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-sm font-medium text-primary-200">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                   SEO Optimized Gallery
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-primary-200">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                   Static Asset Caching
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-primary-200">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                   Nature Mode Rendering
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl mb-6 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-xs text-red-200 font-medium leading-relaxed">{error}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Plant Project Online'}
              </button>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-nature-100 shadow-sm">
                <h4 className="text-sm font-black text-primary-950 uppercase tracking-widest mb-4">Guidelines</h4>
                <ul className="text-xs text-gray-400 space-y-3 font-medium leading-relaxed">
                  <li>• High resolution 4:3 images recommended.</li>
                  <li>• Detailed descriptions improve SEO visibility.</li>
                  <li>• Accurate categorization helps users find your craft.</li>
                </ul>
            </div>
          </aside>
        </form>
      </main>
    </div>
  )
}

export default AddService
