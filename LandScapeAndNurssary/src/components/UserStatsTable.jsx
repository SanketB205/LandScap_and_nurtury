const UserStatsTable = ({ stats }) => {
  const data = [
    { metric: 'Total Gardeners', value: stats.totalUsers || 0 },
    { metric: 'New Sprouts (This Month)', value: stats.newUsersThisMonth || 0 },
    { metric: 'Active Contributor', value: stats.activeUsers || 0 },
  ]

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-nature-100 overflow-hidden h-full">
      <div className="px-10 py-8 border-b border-nature-50">
         <h2 className="text-xl font-display font-black text-primary-950 italic">User Metrics</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-nature-50/80 border-y border-nature-100">
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary-900/40">Demographic</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary-900/40 text-right">Population</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nature-100">
            {data.map((item, idx) => (
              <tr key={idx} className={`transition-all hover:bg-emerald-50/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-nature-50/20'}`}>
                <td className="px-10 py-6">
                  <p className="font-black text-primary-950 text-[10px] uppercase tracking-widest">{item.metric}</p>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="inline-flex items-center px-4 py-1.5 bg-primary-950 text-emerald-400 rounded-xl font-black text-sm tabular-nums">
                    {item.value.toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserStatsTable
