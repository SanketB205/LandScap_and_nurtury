import { useState, useEffect } from 'react'
import { 
  UserCircle, Package, Heart, Settings, LogOut, 
  MapPin, Phone, Mail, Edit3, Shield, Loader2,
  ChevronRight, Calendar, CreditCard, Clock
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Link, useSearchParams } from 'react-router-dom'

const Account = () => {
  const { user, logout, token } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromUrl = searchParams.get('tab') || 'profile'
  const [activeTab, setActiveTab] = useState(tabFromUrl)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setActiveTab(tabFromUrl)
  }, [tabFromUrl])

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: UserCircle },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders()
    }
  }, [activeTab])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (res.ok) {
        setOrders(data)
      }
    } catch (err) {
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="animate-fade-in space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-nature-100">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-8 border-b border-nature-50">
                <div className="relative">
                  <div className="w-24 h-24 bg-primary-800 rounded-3xl flex items-center justify-center text-white text-4xl font-serif shadow-lg">
                    {user?.name?.charAt(0).toUpperCase() || 'G'}
                  </div>
                  {user?.role === 'admin' && (
                    <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-1.5 rounded-lg shadow-md" title="Admin Account">
                      <Shield className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-serif text-nature-900 mb-1">{user?.name}</h2>
                  <p className="text-nature-500 flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4" /> {user?.email}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 bg-nature-100 text-nature-700 rounded-full text-xs font-bold uppercase tracking-wider">
                      {user?.role || 'Member'}
                    </span>
                    <span className="px-3 py-1 bg-nature-50 text-nature-400 rounded-full text-xs font-bold uppercase tracking-wider">
                      Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <button className="md:ml-auto flex items-center gap-2 px-6 py-3 bg-nature-50 hover:bg-nature-100 text-nature-700 rounded-xl transition-colors font-medium">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-4">
                  <h3 className="text-lg font-serif text-nature-800 mb-4 px-2">Contact Details</h3>
                  <div className="p-4 bg-nature-50 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Phone className="w-5 h-5 text-nature-600" />
                    </div>
                    <div>
                      <p className="text-nature-400 text-xs font-medium uppercase tracking-tight">Phone Number</p>
                      <p className="text-nature-800 font-semibold">{user?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-nature-50 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Mail className="w-5 h-5 text-nature-600" />
                    </div>
                    <div>
                      <p className="text-nature-400 text-xs font-medium uppercase tracking-tight">Email Address</p>
                      <p className="text-nature-800 font-semibold">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-serif text-nature-800 mb-4 px-2">Saved Address</h3>
                  <div className="p-4 bg-nature-50 rounded-2xl flex items-start gap-4 h-full min-h-[120px]">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <MapPin className="w-5 h-5 text-nature-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-nature-400 text-xs font-medium uppercase tracking-tight">Current Address</p>
                      <p className="text-nature-800 font-semibold mt-1 leading-relaxed">
                        {user?.address || 'No address added yet. Add an address to speed up your checkout process.'}
                      </p>
                      <button className="mt-2 text-primary-700 font-bold hover:underline">
                        {user?.address ? 'Change Address' : '+ Add Address'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-nature-100 shadow-sm text-center transform hover:-translate-y-1 transition-transform">
                <p className="text-2xl font-bold text-primary-700">{orders.length}</p>
                <p className="text-nature-400 text-sm">Total Orders</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-nature-100 shadow-sm text-center transform hover:-translate-y-1 transition-transform">
                <p className="text-2xl font-bold text-primary-700">0</p>
                <p className="text-nature-400 text-sm">Wishlist Items</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-nature-100 shadow-sm text-center transform hover:-translate-y-1 transition-transform">
                <p className="text-2xl font-bold text-primary-700">0</p>
                <p className="text-nature-400 text-sm">Reward Points</p>
              </div>
            </div>
          </div>
        )
      case 'orders':
        return (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-serif font-black text-primary-900">Your <span className="text-primary-600 italic">Orders</span></h2>
              <span className="text-xs font-black text-primary-400 uppercase tracking-widest">{orders.length} Total</span>
            </div>
            
            {loading ? (
              <div className="bg-white rounded-3xl p-20 flex flex-col items-center justify-center border border-nature-100">
                <Loader2 className="w-10 h-10 text-primary-700 animate-spin mb-4" />
                <p className="text-primary-900 font-bold italic">Fetching your history...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-nature-100 text-center flex flex-col items-center">
                <div className="w-24 h-24 bg-nature-50 rounded-full flex items-center justify-center mb-8">
                  <Package className="w-12 h-12 text-primary-200" />
                </div>
                <h3 className="text-2xl font-serif text-nature-900 mb-3">No Orders Found</h3>
                <p className="text-nature-500 max-w-xs mb-10 leading-relaxed font-medium">You haven't placed any orders yet. Start shopping and transform your space!</p>
                <Link to="/products" className="bg-primary-800 hover:bg-primary-900 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary-900/10 transition-all active:scale-95 flex items-center gap-2">
                  Browse Collection <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-nature-100 hover:shadow-xl transition-all duration-500">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-nature-50">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-black text-primary-400 uppercase tracking-widest mb-1">
                          <Clock className="w-3 h-3" /> Order ID
                        </div>
                        <p className="text-lg font-black text-primary-900 tracking-tighter">#{order._id.slice(-8).toUpperCase()}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-nature-50 px-4 py-2 rounded-xl flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary-600" />
                          <span className="text-sm font-bold text-primary-900">
                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tighter ${
                          order.orderStatus === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' : 'bg-primary-100 text-primary-700'
                        }`}>
                          {order.orderStatus}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                         <div className="flex -space-x-3 overflow-hidden mb-4">
                          {order.products.slice(0, 5).map((p, i) => (
                            <div key={i} className="inline-block h-12 w-12 rounded-xl ring-4 ring-white bg-nature-50 overflow-hidden shadow-md">
                              <img src={p.productId?.image || 'https://placehold.co/100x100?text=P'} alt="" className="h-full w-full object-cover" />
                            </div>
                          ))}
                          {order.products.length > 5 && (
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl ring-4 ring-white bg-primary-900 text-white text-[10px] font-black uppercase tracking-tighter shadow-md">
                              +{order.products.length - 5}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 font-medium">
                          {order.products.map(p => p.productId?.name).join(', ')}
                        </p>
                      </div>

                      <div className="bg-nature-50 p-6 rounded-2xl border border-nature-100 flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">Total Amount</span>
                          <span className="text-xs font-bold text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded-lg">{order.paymentStatus}</span>
                        </div>
                        <p className="text-3xl font-black text-primary-900 tracking-tighter">₹{order.totalAmount}</p>
                        <div className="flex items-center gap-2 mt-3 text-primary-500 text-[10px] font-bold uppercase tracking-widest">
                          <CreditCard className="w-3 h-3" /> {order.paymentMethod.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      default:
        return (
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-nature-100 text-center animate-fade-in">
            <h2 className="text-xl font-serif text-nature-900 mb-2">Section Coming Soon</h2>
            <p className="text-nature-500 font-medium">We're still growing this part of your green space. Stay tuned!</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-nature-50 pt-32 pb-24 px-4">
      <div className="section-wrapper max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-nature-100 sticky top-32">
              <div className="p-4 mb-8">
                <div className="flex items-center gap-2 mb-2 text-primary-600 font-black uppercase tracking-[0.2em] text-[10px]">
                   Nature Account
                </div>
                <h1 className="text-4xl font-serif font-black text-primary-900">Explorer</h1>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSearchParams({ tab: tab.id })}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold group ${
                      activeTab === tab.id
                        ? 'bg-primary-900 text-white shadow-2xl shadow-primary-900/30'
                        : 'text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                    {tab.label}
                  </button>
                ))}
              </nav>

              <div className="mt-12 pt-6 border-t border-nature-50">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold group"
                >
                  <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Account
