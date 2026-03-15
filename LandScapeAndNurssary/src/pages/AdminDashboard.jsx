import { useState, useEffect } from 'react'

// Layout & Components
import AdminSidebar from '../components/AdminSidebar'
import SummaryTable from '../components/SummaryTable'
import RecentOrdersTable from '../components/RecentOrdersTable'
import TopProductsTable from '../components/TopProductsTable'
import MonthlyRevenueTable from '../components/MonthlyRevenueTable'
import UserStatsTable from '../components/UserStatsTable'

// Icons & Context
import { TrendingUp, Sparkles, RefreshCcw } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const AdminDashboard = () => {
  const { token } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    summary: { totalUsers: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0 },
    recentOrders: [],
    topProducts: [],
    monthlyRevenue: [],
    userStats: { totalUsers: 0, newUsersThisMonth: 0, activeUsers: 0 }
  })

  useEffect(() => {
    fetchAllStats()
  }, [])

  const fetchAllStats = async () => {
    setLoading(true)
    try {
      const headers = { 'Authorization': `Bearer ${token}` }
      
      const [summaryRes, recentRes, topRes, monthlyRes, userRes] = await Promise.all([
        fetch('/api/admin/dashboard', { headers }),
        fetch('/api/admin/recent-orders', { headers }),
        fetch('/api/admin/top-products', { headers }),
        fetch('/api/admin/monthly-revenue', { headers }),
        fetch('/api/admin/user-stats', { headers })
      ])

      const [summary, recent, top, monthly, users] = await Promise.all([
        summaryRes.json(),
        recentRes.json(),
        topRes.json(),
        monthlyRes.json(),
        userRes.json()
      ])

      setStats({
        summary,
        recentOrders: recent,
        topProducts: top,
        monthlyRevenue: monthly,
        userStats: users
      })
    } catch (err) {
      console.error('Error fetching admin stats:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex bg-nature-50 min-h-screen pt-20">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4 text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">
               <Sparkles className="w-4 h-4" /> Management Suit
            </div>
            <h1 className="text-5xl font-display font-black text-primary-950">Administrative <span className="text-emerald-600 italic">Reports.</span></h1>
          </div>
          <button 
            onClick={fetchAllStats}
            className="flex items-center gap-3 bg-white border border-nature-100 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-primary-950 hover:bg-emerald-50 hover:text-emerald-700 transition-all shadow-sm active:scale-95"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
             <div className="relative">
                <div className="w-20 h-20 rounded-3xl border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <TrendingUp className="w-8 h-8 text-emerald-600 animate-pulse" />
                </div>
             </div>
             <p className="text-primary-950 font-display italic text-2xl mt-8 animate-pulse text-center">Generating Tabular Reports...</p>
          </div>
        ) : (
          <div className="space-y-12 animate-fade-in">
            <SummaryTable summary={stats.summary} />
            <RecentOrdersTable orders={stats.recentOrders} />
            <TopProductsTable products={stats.topProducts} />
            <MonthlyRevenueTable stats={stats.monthlyRevenue} />
            <UserStatsTable stats={stats.userStats} />
            
            {/* Footer Metric */}
            <div className="mt-12 text-center py-10 border-t border-nature-100">
               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-nature-300">End of Analytical Report</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
