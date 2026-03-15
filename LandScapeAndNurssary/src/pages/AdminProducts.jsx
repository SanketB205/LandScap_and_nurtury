import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Icons
import { 
  Package, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react'

// Components
import AdminSidebar from '../components/AdminSidebar'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/products')
      const data = await res.json()
      if (res.ok) {
        setProducts(data)
      } else {
        throw new Error(data.message || 'Failed to fetch products')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.ok) {
          setProducts(products.filter(p => p._id !== id))
        } else {
          const data = await res.json()
          alert(data.message || 'Failed to delete product')
        }
      } catch (err) {
        alert('Error: ' + err.message)
      }
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex bg-nature-50 min-h-screen pt-20">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif text-nature-900 font-bold">Manage Products</h1>
            <p className="text-nature-500">View, edit, and manage your inventory.</p>
          </div>
          <Link 
            to="/admin/add-product" 
            className="flex items-center gap-2 px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-semibold shadow-lg transition-all active:scale-95 w-fit"
          >
            <Plus className="w-5 h-5" /> Add New Product
          </Link>
        </header>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-nature-100 mb-8 flex items-center gap-3">
          <Search className="w-5 h-5 text-nature-400 ml-2" />
          <input 
            type="text" 
            placeholder="Search products by name or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none focus:ring-0 text-nature-800 placeholder:text-nature-300"
          />
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-nature-100 overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-nature-400">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p>Loading inventory...</p>
            </div>
          ) : error ? (
            <div className="p-20 flex flex-col items-center justify-center text-red-500">
              <AlertCircle className="w-10 h-10 mb-4" />
              <p>Error: {error}</p>
              <button 
                onClick={fetchProducts}
                className="mt-4 px-6 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="p-20 flex flex-col items-center justify-center text-nature-400">
              <Package className="w-16 h-16 opacity-20 mb-4" />
              <h2 className="text-xl font-serif font-bold text-nature-900">No Products Yet</h2>
              <p className="mb-6">Your inventory is empty. Start by adding your first product!</p>
              <Link 
                to="/admin/add-product" 
                className="px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold shadow-md"
              >
                Add My First Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-nature-50 border-b border-nature-100">
                    <th className="px-6 py-4 text-xs font-bold text-nature-400 uppercase tracking-widest">Image</th>
                    <th className="px-6 py-4 text-xs font-bold text-nature-400 uppercase tracking-widest">Product Info</th>
                    <th className="px-6 py-4 text-xs font-bold text-nature-400 uppercase tracking-widest">Pricing</th>
                    <th className="px-6 py-4 text-xs font-bold text-nature-400 uppercase tracking-widest">Stock Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-nature-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nature-50">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-nature-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-nature-100">
                          <img 
                            src={product.image ? `${product.image}` : '/placeholder.png'} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => e.target.src = 'https://placehold.co/100x100?text=Plant'}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-nature-900 leading-tight mb-1">{product.name}</div>
                        <div className="flex gap-2">
                          <span className="text-[10px] bg-nature-100 text-nature-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                            {product.category}
                          </span>
                          {product.isFeatured && (
                            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-nature-700">₹{product.price}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                          <span className="font-medium text-nature-800">{product.stock} in stock</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            to={`/admin/edit-product/${product._id}`}
                            className="p-2 text-nature-500 hover:text-nature-700 hover:bg-nature-100 rounded-lg transition-all"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-red-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Product"
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

export default AdminProducts
