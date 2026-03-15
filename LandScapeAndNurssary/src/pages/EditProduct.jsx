import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

// Icons
import { 
  Save, 
  ArrowLeft, 
  Upload, 
  X, 
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

// Components
import AdminSidebar from '../components/AdminSidebar'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Indoor Plants',
    stock: '',
    isFeatured: false
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [existingImage, setExistingImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const categories = ['Indoor Plants', 'Outdoor Plants', 'Pots', 'Gardening Tools', 'Seeds']

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`)
        const data = await res.json()
        if (res.ok) {
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            stock: data.stock,
            isFeatured: data.isFeatured
          })
          setExistingImage(data.image)
        } else {
          throw new Error(data.message || 'Product not found')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      const data = new FormData()
      
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key])
      })
      
      if (image) {
        data.append('image', image)
      }

      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      })

      const resData = await res.json()

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => navigate('/admin/products'), 1500)
      } else {
        throw new Error(resData.message || 'Failed to update product')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex bg-nature-50 min-h-screen pt-20">
      <AdminSidebar />
      <main className="flex-1 p-8 flex items-center justify-center text-nature-400">
        <Loader2 className="w-10 h-10 animate-spin" />
      </main>
    </div>
  )

  return (
    <div className="flex bg-nature-50 min-h-screen pt-20">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <header className="mb-10">
          <Link to="/admin/products" className="flex items-center gap-2 text-nature-400 hover:text-nature-700 transition-colors mb-4 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <h1 className="text-3xl font-serif text-nature-900 font-bold">Edit Product</h1>
          <p className="text-nature-500">Update information for "{formData.name}".</p>
        </header>

        <div className="max-w-4xl bg-white rounded-3xl shadow-sm border border-nature-100 overflow-hidden">
          {success ? (
            <div className="p-20 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-nature-900 mb-2">Updated Successfully!</h2>
              <p className="text-nature-500">Redirecting you back to the inventory...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12">
              {error && (
                <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3 rounded-r-xl">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-10">
                {/* Left Column: Image Upload */}
                <div className="space-y-6">
                  <label className="block text-sm font-bold text-nature-700 uppercase tracking-wider mb-2">Product Image</label>
                  <div 
                    className={`relative aspect-square rounded-3xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center text-center p-6 ${
                      preview || existingImage ? 'border-nature-200 bg-white' : 'border-nature-100 bg-nature-50/50 hover:bg-nature-50 hover:border-nature-300'
                    }`}
                  >
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : existingImage ? (
                      <img src={`${existingImage}`} alt="Current" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-nature-300 mb-2" />
                        <p className="text-nature-800 font-bold mb-1 font-sans">Click to change image</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {(preview || existingImage) && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <p className="text-white text-sm font-bold flex items-center gap-2">
                           <Upload className="w-4 h-4" /> Change Image
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Text Inputs */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-nature-700 uppercase tracking-wider mb-2">Product Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl focus:ring-2 focus:ring-nature-500 focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-nature-700 uppercase tracking-wider mb-2">Category</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl focus:ring-2 focus:ring-nature-500 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-nature-700 uppercase tracking-wider mb-2">Price (₹)</label>
                      <input 
                        type="number" 
                        name="price"
                        required
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl focus:ring-2 focus:ring-nature-500 focus:bg-white transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-nature-700 uppercase tracking-wider mb-2">Stock</label>
                      <input 
                        type="number" 
                        name="stock"
                        required
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl focus:ring-2 focus:ring-nature-500 focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-nature-700 uppercase tracking-wider mb-2">Description</label>
                    <textarea 
                      name="description"
                      required
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl focus:ring-2 focus:ring-nature-500 focus:bg-white transition-all outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-nature-50 rounded-2xl border border-nature-100 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      id="isFeatured" 
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                      className="w-6 h-6 rounded-lg border-2 border-nature-200 text-nature-700 focus:ring-nature-500 transition-all cursor-pointer"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-bold text-nature-700 cursor-pointer select-none">
                      Feature on Home Page
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-3 py-5 bg-primary-700 hover:bg-primary-800 text-white rounded-2xl font-bold shadow-xl transform transition-all active:scale-95 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-6 h-6" /> Save Changes
                    </>
                  )}
                </button>
                <Link 
                  to="/admin/products"
                  className="px-10 py-5 bg-nature-50 hover:bg-nature-100 text-nature-700 rounded-2xl font-bold transition-all text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

export default EditProduct
