const TopProductsTable = ({ products }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-nature-100 overflow-hidden h-full">
      <div className="px-10 py-8 border-b border-nature-50">
         <h2 className="text-xl font-display font-black text-primary-950 italic">Top Performers</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-nature-50/80 border-y border-nature-100">
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary-900/40">Product</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary-900/40">Units</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary-900/40 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nature-100">
            {products.map((product, idx) => (
              <tr key={idx} className={`transition-all hover:bg-emerald-50/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-nature-50/20'}`}>
                <td className="px-10 py-6">
                  <p className="font-black text-primary-950 text-xs uppercase tracking-wider">{product.productName}</p>
                </td>
                <td className="px-10 py-6">
                  <div className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md font-black text-[10px]">
                    {product.unitsSold}
                  </div>
                </td>
                <td className="px-10 py-6 text-right">
                  <p className="font-black text-primary-950 text-sm tabular-nums">₹{product.totalRevenue.toLocaleString()}</p>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="3" className="px-10 py-12 text-center text-gray-400 italic">No sales data recorded.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopProductsTable
