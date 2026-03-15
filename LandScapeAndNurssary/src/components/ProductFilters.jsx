import { SlidersHorizontal, Leaf, Sprout, Flower, Shell, Shovel, PackageOpen, X, ChevronDown } from 'lucide-react'

const categories = [
  { id: 'All',            label: 'All Collection',  icon: Leaf },
  { id: 'Indoor Plants',  label: 'Indoor Plants',   icon: Sprout },
  { id: 'Outdoor Plants', label: 'Outdoor Plants',  icon: Flower },
  { id: 'Pots',           label: 'Pots & Planters', icon: Shell },
  { id: 'Gardening Tools',label: 'Premium Tools',   icon: Shovel },
  { id: 'Seeds',          label: 'Organic Seeds',   icon: PackageOpen },
]

const ProductFilters = ({ 
  activeCategory, 
  setActiveCategory, 
  minPrice, 
  setMinPrice, 
  maxPrice, 
  setMaxPrice, 
  sortBy, 
  setSortBy,
  onReset
}) => {
  return (
    <div className="space-y-10">
      {/* Category Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
             <SlidersHorizontal className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary-950">Categories</h3>
        </div>
        
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${
                activeCategory === cat.id 
                ? 'bg-primary-950 text-white shadow-xl shadow-primary-900/20' 
                : 'bg-white text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 border border-nature-100'
              }`}
            >
              <cat.icon className={`w-5 h-5 ${activeCategory === cat.id ? 'text-emerald-400' : 'text-gray-300 group-hover:text-emerald-500'}`} />
              <span className="font-black text-sm uppercase tracking-widest">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-nature-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary-950">Price Range</h3>
           <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">₹ INR</span>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-gray-400 ml-1">Min</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-3 bg-nature-50 border border-nature-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold text-sm"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-gray-400 ml-1">Max</label>
               <input
                 type="number"
                 placeholder="5000"
                 className="w-full px-4 py-3 bg-nature-50 border border-nature-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold text-sm"
                 value={maxPrice}
                 onChange={(e) => setMaxPrice(e.target.value)}
               />
            </div>
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary-950 mb-6 flex items-center gap-2">
           Sort by <ChevronDown className="w-3 h-3 opacity-30" />
        </h3>
        <select
          className="w-full px-6 py-4 bg-white border border-nature-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/5 font-black text-xs uppercase tracking-widest text-primary-950 appearance-none cursor-pointer shadow-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest Collection</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full py-4 border-2 border-dashed border-nature-200 text-nature-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
      >
        <X className="w-3 h-3" /> Clear All Filters
      </button>
    </div>
  )
}

export default ProductFilters
