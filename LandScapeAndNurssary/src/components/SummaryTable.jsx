import { Users, ShoppingBag, TrendingUp, Camera } from 'lucide-react'

const SummaryTable = ({ summary }) => {
  const data = [
    { label: 'Total Gardeners', value: summary.totalUsers, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Orders Placed', value: summary.totalOrders, icon: ShoppingBag, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Gross Revenue', value: `₹${summary.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-primary-950', bg: 'bg-gray-100' },
    { label: 'Product Inventory', value: summary.totalProducts, icon: Camera, color: 'text-nature-700', bg: 'bg-nature-50' },
  ]

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-nature-100 overflow-hidden">
      <div className="px-10 py-8 border-b border-nature-50 flex items-center justify-between bg-white">
        <h2 className="text-xl font-display font-black text-primary-950 italic">Performance Summary</h2>
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">Real-time Data</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-nature-50/80 border-y border-nature-100">
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary-900/40">KPI Metric</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary-900/40 text-right">Magnitude</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nature-100">
            {data.map((item, idx) => (
              <tr key={idx} className={`transition-all hover:bg-emerald-50/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-nature-50/20'}`}>
                <td className="px-10 py-6 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-black text-primary-950 text-[10px] uppercase tracking-[0.1em]">{item.label}</span>
                </td>
                <td className="px-10 py-6 text-right">
                  <span className="text-xl font-black text-primary-950 tabular-nums italic">{item.value}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SummaryTable
