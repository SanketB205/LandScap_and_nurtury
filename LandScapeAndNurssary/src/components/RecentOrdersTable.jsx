import { ExternalLink } from 'lucide-react'

const RecentOrdersTable = ({ orders }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-nature-100 overflow-hidden">
      <div className="px-10 py-8 border-b border-nature-50 flex items-center justify-between">
         <h2 className="text-xl font-display font-black text-primary-950 italic">Recent Orders</h2>
         <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">Last 10 Activities</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-nature-50/80 backdrop-blur-sm border-y border-nature-100">
              <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.25em] text-primary-900/40">Reference</th>
              <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.25em] text-primary-900/40">Identity</th>
              <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.25em] text-primary-900/40 text-right">Value</th>
              <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.25em] text-primary-900/40">Status</th>
              <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.25em] text-primary-900/40 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nature-100">
            {orders.map((order, idx) => (
              <tr key={order.orderId} className={`transition-all hover:bg-emerald-50/30 group ${idx % 2 === 0 ? 'bg-white' : 'bg-nature-50/20'}`}>
                <td className="px-10 py-6 font-bold text-xs text-primary-950 font-mono">
                  #{order.orderId.substring(order.orderId.length - 8)}
                </td>
                <td className="px-10 py-6">
                  <p className="font-black text-primary-950 text-sm">{order.user}</p>
                </td>
                <td className="px-10 py-6 text-right">
                  <p className="font-black text-emerald-800 text-sm tabular-nums">₹{order.amount.toLocaleString()}</p>
                </td>
                <td className="px-10 py-6">
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border ${
                    order.status === 'DELIVERED' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                    : order.status === 'PROCESSING' 
                    ? 'bg-amber-50 text-amber-600 border-amber-100'
                    : 'bg-primary-50 text-primary-600 border-primary-100'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-10 py-6 text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary-900/30 font-mono italic">{new Date(order.date).toLocaleDateString()}</p>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="px-10 py-20 text-center text-gray-400 italic">No orders found. Garden is quiet today.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrdersTable
