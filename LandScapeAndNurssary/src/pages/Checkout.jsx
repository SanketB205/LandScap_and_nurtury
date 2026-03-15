import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  X,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react'

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { token, user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    paymentMethod: 'CASH',
  })

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  // Redirect if cart empty
  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePaymentInputChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    
    if (formData.paymentMethod === 'DUMMY_GATEWAY') {
      setShowPaymentModal(true)
    } else {
      submitOrder('PENDING')
    }
  }

  const submitOrder = async (paymentStatus = 'PENDING') => {
    setLoading(true)
    try {
      const orderData = {
        products: cartItems.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity
        })),
        totalAmount: cartTotal,
        paymentMethod: formData.paymentMethod,
        paymentStatus: paymentStatus,
        shippingDetails: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address
        }
      }

      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      })

      const data = await res.json()
      if (res.ok) {
        clearCart()
        navigate('/order-success', { state: { order: data } })
      } else {
        alert(data.message || 'Something went wrong')
      }
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-nature-50 pt-32 pb-24">
      <div className="section-wrapper">
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4 text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">
             Secure Transaction Environment
          </div>
          <h1 className="text-5xl font-serif font-black text-primary-900">Secure <span className="text-primary-600 italic">Checkout</span></h1>
        </header>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Shipping Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-nature-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary-900 text-white rounded-2xl flex items-center justify-center font-black">1</div>
                <h2 className="text-3xl font-serif font-bold text-primary-900">Billing & Shipping</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-primary-700 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name
                  </label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none font-medium" 
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-primary-700 uppercase tracking-widest flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </label>
                  <input 
                    type="text" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none font-medium" 
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-primary-700 uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Final Shipping Address
                  </label>
                  <textarea 
                    name="address"
                    required
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none font-medium resize-none" 
                    placeholder="Provide detailed street address, landmark, city, and pincode"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-nature-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary-900 text-white rounded-2xl flex items-center justify-center font-black">2</div>
                <h2 className="text-3xl font-serif font-bold text-primary-900">Payment Selection</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <label className={`relative p-8 rounded-[2rem] border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4 ${formData.paymentMethod === 'CASH' ? 'border-primary-700 bg-primary-50 shadow-lg scale-105' : 'border-nature-100 bg-nature-50 hover:border-primary-200'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="CASH" 
                    className="hidden" 
                    checked={formData.paymentMethod === 'CASH'}
                    onChange={handleInputChange}
                  />
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.paymentMethod === 'CASH' ? 'bg-primary-800 text-white' : 'bg-white text-primary-400'}`}>
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-900">Cash on Delivery</h3>
                    <p className="text-xs text-primary-600 font-medium mt-1">Pay when your plants arrive</p>
                  </div>
                  {formData.paymentMethod === 'CASH' && (
                    <div className="absolute top-4 right-4 text-primary-700">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                </label>

                <label className={`relative p-8 rounded-[2rem] border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4 ${formData.paymentMethod === 'DUMMY_GATEWAY' ? 'border-primary-700 bg-primary-50 shadow-lg scale-105' : 'border-nature-100 bg-nature-50 hover:border-primary-200'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="DUMMY_GATEWAY" 
                    className="hidden" 
                    checked={formData.paymentMethod === 'DUMMY_GATEWAY'}
                    onChange={handleInputChange}
                  />
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.paymentMethod === 'DUMMY_GATEWAY' ? 'bg-primary-800 text-white' : 'bg-white text-primary-400'}`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-900">Online Payment</h3>
                    <p className="text-xs text-primary-600 font-medium mt-1">Cards, UPI, and Wallets</p>
                  </div>
                   {formData.paymentMethod === 'DUMMY_GATEWAY' && (
                    <div className="absolute top-4 right-4 text-primary-700">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="sticky top-32">
             <div className="bg-white rounded-[2.5rem] p-10 border border-nature-100 shadow-xl overflow-hidden relative">
              <h2 className="text-2xl font-serif font-black text-primary-900 mb-8 border-b border-nature-50 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
                {cartItems.map((item) => (
                  <div key={item.productId._id} className="flex gap-4">
                    <img src={item.productId.image} alt={item.productId.name} className="w-16 h-16 rounded-2xl object-cover bg-nature-50" />
                    <div className="flex-1">
                      <h4 className="font-bold text-primary-950 text-sm">{item.productId.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">Qty: {item.quantity} × ₹{item.productId.price}</p>
                    </div>
                    <span className="font-black text-primary-800 text-sm">₹{item.productId.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-nature-50">
                <div className="flex justify-between text-sm font-medium text-gray-600">
                  <span>Cart Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-emerald-600">
                  <span>Eco-Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="h-[1px] bg-nature-50 my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black text-primary-700 uppercase tracking-widest">Total Payable</span>
                  <span className="text-4xl font-black text-primary-950 tracking-tighter">₹{cartTotal}</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full mt-10 bg-primary-800 text-white py-6 rounded-[2rem] font-black text-lg hover:bg-primary-900 transition-all shadow-xl shadow-primary-900/10 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? 'Processing...' : 'Place My Order'} <ChevronRight className="w-6 h-6" />
              </button>

              <div className="mt-8 flex items-center justify-center gap-3 text-emerald-600 bg-emerald-50 py-4 rounded-2xl">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-tighter">Secure 256-Bit SSL Checkout</span>
              </div>
            </div>
            
            <div className="mt-6 p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
              <Info className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <p className="text-xs text-amber-800 font-medium leading-relaxed">
                By placing an order, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and acknowledge our carbon-neutral packaging promise.
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Dummy Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
          <div className="absolute inset-0 bg-primary-950/80 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[3.5rem] p-10 relative z-10 shadow-3xl animate-slide-up border border-nature-100 overflow-hidden">
             
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-8 right-8 p-3 bg-nature-50 rounded-2xl text-primary-400 hover:text-red-500 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-20 h-20 bg-primary-900 text-white rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-primary-900/40">
                <CreditCard className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-serif font-black text-primary-900">Secure Payment</h2>
              <p className="text-gray-500 mt-2 font-medium">Complete your ₹{cartTotal} purchase</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Card Number</label>
                <div className="relative">
                   <input 
                    type="text" 
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    maxLength="16"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentInputChange}
                    className="w-full pl-14 pr-6 py-5 bg-nature-50 border border-nature-100 rounded-3xl outline-none focus:ring-2 focus:ring-primary-500 font-mono text-lg tracking-widest shadow-inner"
                  />
                  <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Expiry Date</label>
                  <input 
                    type="text" 
                    name="expiry"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={paymentData.expiry}
                    onChange={handlePaymentInputChange}
                    className="w-full px-6 py-5 bg-nature-50 border border-nature-100 rounded-3xl outline-none focus:ring-2 focus:ring-primary-500 font-mono text-lg text-center shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">CVV Code</label>
                  <input 
                    type="password" 
                    name="cvv"
                    placeholder="***"
                    maxLength="3"
                    value={paymentData.cvv}
                    onChange={handlePaymentInputChange}
                    className="w-full px-6 py-5 bg-nature-50 border border-nature-100 rounded-3xl outline-none focus:ring-2 focus:ring-primary-500 font-mono text-lg text-center shadow-inner"
                  />
                </div>
              </div>

              <div className="pt-6 relative">
                 <button 
                  onClick={() => submitOrder('PAID')}
                  disabled={loading}
                  className="w-full bg-primary-900 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-primary-950 transition-all shadow-2xl shadow-primary-900/30 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Authorizing...' : `Pay ₹${cartTotal}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
