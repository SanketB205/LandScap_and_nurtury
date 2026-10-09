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
    <div className="group bg-white rounded-[2.5rem] p-5 shadow-lg shadow-nature-200/40 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500 border border-nature-100 relative overflow-hidden flex flex-col h-full hover:-translate-y-2 shimmer-dark">
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
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-nature-50 mb-7">
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
        
        <h3 className="text-xl font-display font-black text-primary-950 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-tight">
          {product.name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between pt-5 border-t-2 border-dashed border-nature-100">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Price</span>
            <span className="text-3xl font-display font-black text-primary-950 tracking-tight">₹{product.price}</span>
          </div>
          
          <button 
            disabled={product.stock === 0 || adding}
            onClick={handleAddToCart}
            className={`w-14 h-14 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center ${
              product.stock === 0 
              ? 'bg-nature-100 text-nature-300 cursor-not-allowed border border-nature-200'
              : success 
                ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                : 'bg-primary-950 text-white hover:bg-emerald-700 hover:-translate-y-1 shadow-primary-900/20'
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
