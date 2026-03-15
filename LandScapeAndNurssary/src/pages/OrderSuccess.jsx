import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, Package, ArrowRight, Share2, Printer, Home } from 'lucide-react'
import { useEffect } from 'react'

const OrderSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state?.order

  useEffect(() => {
    if (!order) {
      navigate('/')
    }
  }, [order, navigate])

  if (!order) return null

  return (
    <div className="min-h-screen bg-nature-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-[4rem] shadow-2xl shadow-primary-900/10 overflow-hidden flex flex-col md:flex-row border border-nature-100 italic">
          
          {/* Left Side: Illustration & Core Message */}
          <div className="bg-primary-900 text-white p-12 md:w-1/2 flex flex-col items-center justify-center text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
            
            <div className="relative">
              <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-3xl shadow-emerald-500/40 animate-pulse-slow">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-black mb-6 leading-tight">Your Order is <span className="text-emerald-400">Planted!</span></h1>
              <p className="text-primary-100 text-lg mb-12 font-medium leading-relaxed">
                Thank you for growing with GreenScape. We're carefully preparing your new companions for their journey.
              </p>
              
              <div className="flex gap-4 w-full">
                <Link to="/products" className="flex-1 bg-white text-primary-900 py-4 rounded-2xl font-black text-sm hover:bg-primary-50 transition-all flex items-center justify-center gap-2">
                  Shop More <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/" className="w-14 h-14 bg-primary-800 text-white rounded-2xl flex items-center justify-center hover:bg-primary-700 transition-all shadow-lg border border-primary-700">
                  <Home className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Order Receipt Details */}
          <div className="p-12 md:w-1/2 bg-white flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mb-2">Order Confirmed</h2>
                  <p className="text-2xl font-black text-primary-950 tracking-tighter">#{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div className="bg-nature-50 p-4 rounded-3xl border border-nature-100">
                  <Package className="w-8 h-8 text-primary-700" />
                </div>
              </div>

              <div className="space-y-8 mb-12">
                <div className="flex justify-between items-end border-b border-nature-50 pb-4">
                  <div>
                    <p className="text-xs text-primary-400 font-bold uppercase mb-1">Payment Method</p>
                    <p className="font-serif font-black text-primary-900">{order.paymentMethod === 'DUMMY_GATEWAY' ? 'Online Payment' : 'Cash on Delivery'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-primary-400 font-bold uppercase mb-1">Status</p>
                    <p className="font-serif font-black text-emerald-600 uppercase tracking-tighter">{order.paymentStatus}</p>
                  </div>
                </div>

                <div className="bg-nature-50 p-6 rounded-[2rem] border border-nature-100 relative overflow-hidden">
                   <div className="flex justify-between items-center relative z-10">
                    <div>
                      <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-1">Amount Paid</p>
                      <p className="text-4xl font-black text-primary-900 tracking-tighter">₹{order.totalAmount}</p>
                    </div>
                    <div className="flex flex-col items-end">
                       <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-1">Arrival Estimate</p>
                       <p className="font-serif font-black text-primary-900">3-5 Days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-primary-700 uppercase tracking-[0.2em] mb-4">What's Next?</h3>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0 font-black">1</div>
                  <p className="text-sm font-medium text-gray-600">You'll receive an email with your full digital receipt and care instructions.</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0 font-black">2</div>
                  <p className="text-sm font-medium text-gray-600">Our nursery experts will select the healthiest plants from our collection.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12 pt-12 border-t border-nature-50 text-primary-400 hover:text-primary-700 transition-colors">
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-nature-100 px-6 py-4 rounded-2xl hover:bg-nature-50 transition-all">
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-nature-100 px-6 py-4 rounded-2xl hover:bg-nature-50 transition-all">
                <Share2 className="w-4 h-4" /> Share Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
