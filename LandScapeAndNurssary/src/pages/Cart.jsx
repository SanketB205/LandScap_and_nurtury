import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight,
  Leaf,
  Loader2
} from 'lucide-react'

const Cart = () => {
  const { cartItems, loading, updateQuantity, removeFromCart, cartTotal } = useCart()
  const navigate = useNavigate()

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-nature-50">
      <Loader2 className="w-12 h-12 text-primary-700 animate-spin mb-4" />
      <p className="text-primary-900 font-serif italic text-xl">Preparing your garden...</p>
    </div>
  )

  if (cartItems.length === 0) return (
    <div className="min-h-screen pt-32 pb-20 bg-nature-50/30 flex items-center justify-center">
      <div className="section-wrapper text-center max-w-2xl px-6 py-20 bg-white rounded-[3rem] shadow-2xl shadow-primary-900/5">
        <div className="w-24 h-24 bg-nature-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-xl">
          <ShoppingBag className="w-10 h-10 text-primary-200" />
        </div>
        <h2 className="text-4xl font-serif font-black text-primary-900 mb-4">Your Bag is Empty</h2>
        <p className="text-gray-500 text-lg mb-10 font-medium">
          Looks like you haven't added any green friends to your space yet. Let's find some!
        </p>
        <Link to="/products" className="btn-primary px-10 py-5 text-lg shadow-2xl shadow-primary-700/20">
          Browse Collection <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-nature-50/30 pt-32 pb-24">
      <div className="section-wrapper">
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4 text-primary-600 font-black uppercase tracking-[0.3em] text-[10px]">
            <div className="w-10 h-[1px] bg-primary-400"></div>
            Shopping Session
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-primary-900">Your <span className="text-primary-600 italic">Cart</span></h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Cart Items Table */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div 
                key={item.productId._id} 
                className="group bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-nature-50 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden"
              >
                {/* Product Image */}
                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-nature-50 flex-shrink-0 shadow-inner">
                  <img 
                    src={item.productId.image} 
                    alt={item.productId.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>

                {/* Info & Price */}
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest block mb-1">
                    {item.productId.category}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-primary-900 mb-2">{item.productId.name}</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <span className="text-xl font-black text-primary-800">₹{item.productId.price}</span>
                    {item.productId.stock <= 5 && (
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                        Limited Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 bg-nature-50 p-2 rounded-2xl border border-nature-100">
                  <button 
                    onClick={() => item.quantity > 1 && updateQuantity(item.productId._id, item.quantity - 1)}
                    className="w-10 h-10 rounded-xl bg-white text-primary-700 hover:bg-primary-700 hover:text-white transition-all shadow-sm flex items-center justify-center disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-black text-primary-900 text-lg">{item.quantity}</span>
                  <button 
                    onClick={() => item.quantity < item.productId.stock && updateQuantity(item.productId._id, item.quantity + 1)}
                    className="w-10 h-10 rounded-xl bg-white text-primary-700 hover:bg-primary-700 hover:text-white transition-all shadow-sm flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="flex flex-col items-end gap-2 pr-2">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Subtotal</p>
                    <p className="text-xl font-black text-primary-950 tracking-tight">₹{item.productId.price * item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.productId._id)}
                    className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group/trash"
                  >
                    <Trash2 className="w-5 h-5 group-hover/trash:scale-110" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="sticky top-32">
            <div className="bg-primary-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-primary-900/30 overflow-hidden relative">
              {/* Pattern Overlay */}
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Leaf className="w-40 h-40 rotate-12" />
              </div>
              
              <h2 className="text-3xl font-serif font-bold mb-8 relative z-10">Cart Summary</h2>
              
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center text-primary-200 font-medium">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between items-center text-primary-200 font-medium">
                  <span>Green Shipping</span>
                  <span className="text-emerald-400 font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center text-primary-200 font-medium">
                  <span>Carbon Offset</span>
                  <span className="text-emerald-400 font-bold">INCLUDED</span>
                </div>
                
                <div className="h-[1px] bg-primary-800 my-2"></div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-primary-300 font-bold uppercase tracking-widest mb-1">Estimated Total</p>
                    <p className="text-5xl font-black tracking-tighter">₹{cartTotal}</p>
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-white text-primary-900 py-6 rounded-3xl font-black text-lg hover:bg-primary-50 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                  >
                    Secure Checkout <ArrowRight className="w-6 h-6" />
                  </button>
                  <p className="text-center text-primary-400 text-xs mt-6 font-medium">
                    Fully encrypted payment processing. Environmentally verified shipping.
                  </p>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-3xl border border-nature-100 text-center">
                <span className="text-[10px] font-black text-emerald-600 uppercase block mb-1">Guarantee</span>
                <p className="text-xs font-bold text-primary-900">7-Day Healthy Arrival</p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-nature-100 text-center">
                <span className="text-[10px] font-black text-emerald-600 uppercase block mb-1">Support</span>
                <p className="text-xs font-bold text-primary-900">Expert Care Help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
