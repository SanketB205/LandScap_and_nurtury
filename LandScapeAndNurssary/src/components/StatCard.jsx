const StatCard = ({ label, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-nature-100 flex items-center gap-6 transition-all hover:shadow-xl hover:-translate-y-1 group">
      <div className={`${color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6`}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <p className="text-nature-400 text-xs font-black uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-primary-950">{value}</p>
      </div>
    </div>
  )
}

export default StatCard
