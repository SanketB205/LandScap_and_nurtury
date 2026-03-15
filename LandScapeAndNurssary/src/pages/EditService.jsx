import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

// Icons
import { 
  ArrowLeft, 
  Upload, 
  X, 
  ImageIcon, 
  Loader2, 
  AlertCircle,
  Save,
  Plus
} from 'lucide-react'

// Components & Context
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../context/AuthContext'

const EditService = () => {
  const { id } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  })
  const [images, setImages] = useState([]) // New files to upload
  const [previews, setPreviews] = useState([]) // Previews for NEW files
  const [existingImages, setExistingImages] = useState([]) // Images already on server
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchService()
  }, [id])

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/services/${id}`)
      const data = await res.json()
      if (res.ok) {
        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
        })
        setExistingImages(data.images)
      } else {
        setError('Service not found')
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Failed to load service data')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([...images, ...files])

    const newPreviews = files.map(file => URL.createObjectURL(file))
    setPreviews([...previews, ...newPreviews])
  }

  const removeNewImage = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newPreviews = [...previews]
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)
  }

  const removeExistingImage = (index) => {
    if (existingImages.length + images.length <= 1) {
      alert('At least one image is required')
      return
    }
    const filtered = [...existingImages]
    filtered.splice(index, 1)
    setExistingImages(filtered)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('category', formData.category)
    
    // Append existing image paths (so backend knows which to keep)
    existingImages.forEach(img => {
      // In this simple implementation, the backend replaces the entire array
      // if files are uploaded. But here we want more granular control if possible.
      // For now, let's stick to the requirement: "Replace with new or keep existing"
    })
    
    // Append new files
    images.forEach(image => {
      data.append('images', image)
    })

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      })

      const resData = await res.json()
      if (res.ok) {
        navigate('/admin/services')
      } else {
        setError(resData.message || 'Failed to update service')
      }
    } catch (err) {
      console.error('Submit error:', err)
      setError('An error occurred while updating')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-nature-50">
      <Loader2 className="w-12 h-12 text-primary-700 animate-spin mb-4" />
      <p className="text-primary-900 font-bold italic">Gathering project tools...</p>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-nature-50 pt-20">
      <AdminSidebar active="services" />
      
      <main className="flex-1 p-8">
        <header className="mb-12">
          <Link to="/admin/services" className="flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-widest mb-6 hover:gap-4 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to List
          </Link>
          <h1 className="text-4xl font-serif font-black text-primary-950">Edit <span className="text-primary-700 italic">Project</span></h1>
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
                    className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium resize-none leading-relaxed"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-nature-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-serif font-black text-primary-950">Visual Assets</h3>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Manage project gallery</p>
                </div>
                <label className="cursor-pointer flex items-center gap-2 bg-primary-100 text-primary-800 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-200 transition-all">
                  <Plus className="w-4 h-4" /> Add More
                  <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {/* Existing Images */}
                {existingImages.map((img, idx) => (
                  <div key={`existing-${idx}`} className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-md">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      className="absolute top-3 right-3 p-2 bg-red-500/80 text-white rounded-xl shadow-lg hover:bg-red-500 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-primary-900/60 backdrop-blur-sm text-[8px] text-white px-2 py-1 rounded-md font-black uppercase tracking-widest">Server</div>
                  </div>
                ))}

                {/* New Previews */}
                {previews.map((preview, idx) => (
                  <div key={`new-${idx}`} className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-md">
                    <img src={preview} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeNewImage(idx)}
                      className="absolute top-3 right-3 p-2 bg-red-500/80 text-white rounded-xl shadow-lg hover:bg-red-500 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-emerald-500/60 backdrop-blur-sm text-[8px] text-white px-2 py-1 rounded-md font-black uppercase tracking-widest">New</div>
                  </div>
                ))}

                <label className="aspect-square border-2 border-dashed border-nature-100 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-nature-50 transition-all text-primary-300 hover:text-primary-700">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-center px-4">Upload Multi</span>
                  <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
            </div>
          </div>

          <aside className="sticky top-8 space-y-6">
            <div className="bg-primary-950 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary-950/40">
              <h4 className="text-xl font-serif font-black mb-6">Update Service</h4>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-sm font-medium text-primary-200">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                   Modification Logging
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-primary-200">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                   Asset Re-optimization
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
                disabled={submitting}
                className="w-full bg-primary-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Prune & Save Changes</>}
              </button>
            </div>
          </aside>
        </form>
      </main>
    </div>
  )
}

export default EditService
