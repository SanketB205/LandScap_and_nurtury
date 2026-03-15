import { ShoppingCart, Heart, Star, Eye, Check } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [adding, setAdding] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setAdding(true)
    const result = await addToCart(product._id, 1)
    setAdding(false)
    
    if (result) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    }
  }

  return (
    <div className="group bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-nature-50 relative overflow-hidden flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        {product.isFeatured && (
          <span className="bg-amber-400 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-amber-400/20">
            Featured
          </span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-orange-500/20">
            Low Stock
          </span>
        )}
        {product.stock === 0 && (
          <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-red-500/20">
            Out of Stock
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-nature-50 mb-6">
        <img 
          src={product.image || 'https://placehold.co/400x500?text=GreenScape'} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => e.target.src = 'https://placehold.co/400x500?text=Plant'}
        />
        
        {/* Quick Actions Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-nature-600 hover:bg-primary-700 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
            <Heart className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-nature-600 hover:bg-primary-700 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-xl">
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-2">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-black text-nature-400 uppercase tracking-[0.2em]">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-nature-900">4.8</span>
          </div>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-nature-900 mb-2 truncate group-hover:text-primary-700 transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-nature-50">
          <div className="flex flex-col">
            <span className="text-xs text-nature-400 font-medium">Price</span>
            <span className="text-2xl font-black text-nature-800 tracking-tight">₹{product.price}</span>
          </div>
          
          <button 
            disabled={product.stock === 0 || adding}
            onClick={handleAddToCart}
            className={`w-14 h-14 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center ${
              product.stock === 0 
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
              : success 
                ? 'bg-emerald-500 text-white' 
                : 'bg-primary-800 text-white hover:bg-primary-900 hover:-translate-y-1'
            }`}
          >
            {adding ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : success ? (
              <Check className="w-6 h-6" />
            ) : (
              <ShoppingCart className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
