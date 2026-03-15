import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Icons
import { 
  Plus, 
  ArrowLeft, 
  Upload, 
  X, 
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

// Components
import AdminSidebar from '../components/AdminSidebar'

const AddProduct = () => {
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const categories = ['Indoor Plants', 'Outdoor Plants', 'Pots', 'Gardening Tools', 'Seeds']

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
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      const data = new FormData()
      
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key])
      })
      
      if (image) {
        data.append('image', image)
      } else {
        throw new Error('Please upload a product image')
      }

      const res = await fetch('/api/products', {
        method: 'POST',
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
        throw new Error(resData.message || 'Failed to add product')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex bg-nature-50 min-h-screen pt-20">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <header className="mb-10">
          <Link to="/admin/products" className="flex items-center gap-2 text-nature-400 hover:text-nature-700 transition-colors mb-4 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <h1 className="text-3xl font-serif text-nature-900 font-bold">Add New Product</h1>
          <p className="text-nature-500">Create a new entry in your plant library.</p>
        </header>

        <div className="max-w-4xl bg-white rounded-3xl shadow-sm border border-nature-100 overflow-hidden">
          {success ? (
            <div className="p-20 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-nature-900 mb-2">Product Added Successfully!</h2>
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
                      preview ? 'border-nature-200 bg-white' : 'border-nature-100 bg-nature-50/50 hover:bg-nature-50 hover:border-nature-300'
                    }`}
                  >
                    {preview ? (
                      <>
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => {setImage(null); setPreview(null)}}
                          className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-all active:scale-90"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-nature-300">
                          <Plus className="w-8 h-8" />
                        </div>
                        <p className="text-nature-800 font-bold mb-1">Click to upload image</p>
                        <p className="text-xs text-nature-400">JPG, PNG or WEBPs only</p>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <p className="text-xs text-amber-700 leading-relaxed font-medium">
                      💡 Tip: Use a high-quality, square image (1000x1000px) with a clean background for best results on the store page.
                    </p>
                  </div>
                </div>

                {/* Right Column: Text Inputs */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-primary-700 uppercase tracking-wider mb-2">Product Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="e.g. Monstera Deliciosa"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
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
                        placeholder="0"
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
                        placeholder="0"
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
                      placeholder="Tell customers about this plant..."
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
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-3 py-5 bg-primary-700 hover:bg-primary-800 text-white rounded-2xl font-bold shadow-xl shadow-primary-700/20 transform transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-6 h-6" /> Create Product
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

export default AddProduct
