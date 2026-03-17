import { useState, useEffect, useCallback } from 'react'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import SearchBar from '../components/SearchBar'
import { 
  Loader2, Leaf, Sparkles, LayoutGrid, 
  ArrowRight, Search, SlidersHorizontal, PackageSearch
} from 'lucide-react'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  // Using callback to prevent unnecessary re-renders when passed down
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        search: searchTerm,
        category: activeCategory,
        minPrice: minPrice,
        maxPrice: maxPrice,
        sort: sortBy
      })

      const res = await fetch(`/api/products?${queryParams.toString()}`)
      const data = await res.json()
      if (res.ok) {
        setProducts(data)
      }
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, activeCategory, minPrice, maxPrice, sortBy])

  // Debounced search/filter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts()
    }, 500)
    return () => clearTimeout(timer)
  }, [fetchProducts])

  const handleReset = () => {
    setSearchTerm('')
    setActiveCategory('All')
    setMinPrice('')
    setMaxPrice('')
    setSortBy('newest')
  }

  return (
    <div className="min-h-screen bg-nature-50/30">
      
      {/* ── Page Header (Visual Hero) ── */}
      <section 
        className="relative pt-32 pb-24 overflow-hidden text-white"
        style={{ backgroundColor: '#0d3311' }}
      >
        {/* Leaf texture overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
        </div>
        {/* Glow blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4ade80, transparent 70%)' }} />
        <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #86efac, transparent 70%)' }} />
        
        <div className="section-wrapper relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px]">
             <Sparkles className="w-4 h-4" /> Discover your sanctuary
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-8 leading-none">
            Botanical <span className="text-emerald-400 italic">Treasures.</span>
          </h1>
          <div className="max-w-4xl mx-auto mb-12">
             <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>
      </section>

      {/* ── Main Layout ── */}
      <section className="section-wrapper pt-24 pb-32">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-80 shrink-0">
             <div className="sticky top-32">
                <ProductFilters 
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onReset={handleReset}
                />
             </div>
          </aside>

          {/* Product Feed */}
          <div className="flex-1">
             <div className="flex items-center justify-between mb-12">
                <div>
                   <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary-950 flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-emerald-600" /> 
                      Showing {products.length} Results
                   </h2>
                </div>
                <div className="flex items-center gap-1 opacity-20">
                   <div className="w-12 h-[1px] bg-primary-950"></div>
                   <Leaf className="w-4 h-4" />
                </div>
             </div>

             {loading ? (
               <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border border-nature-100">
                  <div className="relative">
                     <div className="w-20 h-20 rounded-3xl border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
                     <Leaf className="absolute inset-0 m-auto w-8 h-8 text-emerald-600 animate-pulse" />
                  </div>
                  <p className="text-primary-950 font-display italic text-2xl mt-8 animate-pulse text-center">
                    Gathering fresh arrivals...
                  </p>
               </div>
             ) : products.length === 0 ? (
               <div className="text-center py-40 bg-white rounded-[3rem] border border-nature-100 shadow-sm">
                  <div className="w-24 h-24 bg-nature-50 rounded-full flex items-center justify-center mx-auto mb-8">
                     <PackageSearch className="w-10 h-10 text-nature-200" />
                  </div>
                  <h3 className="text-3xl font-display font-black text-primary-950 mb-4 italic">No botanical companions found</h3>
                  <p className="text-gray-400 mb-10 max-w-md mx-auto font-medium">
                    We couldn't find any plants matching your current filter set. Try broadening your horizon!
                  </p>
                  <button 
                    onClick={handleReset}
                    className="px-12 py-5 bg-primary-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-xl shadow-primary-900/20"
                  >
                     Explore Full Garden
                  </button>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 animate-fade-in">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
               </div>
             )}

             {/* Bottom Pagination / Load More Space */}
             {!loading && products.length > 0 && (
               <div className="mt-20 pt-10 border-t border-nature-100 flex flex-col items-center">
                  <p className="text-xs font-black uppercase tracking-widest text-nature-300 mb-6">You've reached the roots</p>
                  <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-transparent rounded-full opacity-20"></div>
               </div>
             )}
          </div>
        </div>
      </section>

      {/* ── Consultation CTA ── */}
      <section className="bg-primary-950 py-32 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
         <div className="section-wrapper relative z-10 grid md:grid-cols-2 items-center gap-16 text-center md:text-left">
            <div>
               <h2 className="text-5xl md:text-7xl font-display font-black mb-8 leading-tight italic">
                 Lost in the <span className="text-emerald-400">Greenery?</span>
               </h2>
               <p className="text-primary-100/60 text-xl font-medium leading-relaxed mb-12">
                 Finding the perfect plant for your lighting conditions or potting soil can be a journey. Our botanical experts are one message away.
               </p>
               <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
                  <a href="/contact" className="px-12 py-5 bg-white text-primary-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-2xl">
                    Free Consultation
                  </a>
                  <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em]">Available 9AM - 8PM</p>
               </div>
            </div>
            <div className="hidden md:flex justify-center lg:justify-end">
               <div className="relative w-80 h-80 rounded-[4rem] border border-white/10 flex items-center justify-center overflow-hidden rotate-6">
                  <div className="absolute inset-4 rounded-[3.5rem] bg-white/5 backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center border border-white/5">
                     <SlidersHorizontal className="w-12 h-12 text-emerald-400 mb-6 -rotate-6" />
                     <p className="font-display italic text-2xl text-white mb-4">Precision Planting</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Custom filters for your dream garden</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  )
}

export default Products
