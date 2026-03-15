import { useState, useEffect } from 'react'
import { 
  Camera, Filter, Loader2, Sparkles, LayoutGrid, 
  ArrowRight, Leaf, Sprout, Sun, Wind
} from 'lucide-react'
import GalleryCard from '../components/GalleryCard'

const categories = [
  'All',
  'Garden Designs',
  'Terrace Gardens',
  'Vertical Gardens',
  'Nursery Plants',
  'Landscaping Projects'
]

const Gallery = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      if (res.ok) {
        setItems(data)
      }
    } catch (err) {
      console.error('Error fetching gallery:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-nature-50/30">
      
      {/* ── Dynamic Hero Section ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        <div className="section-wrapper relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-200 animate-bounce-slow">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-emerald-700 font-black uppercase tracking-[0.3em] text-xs">Aesthetic Spaces</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-display font-black text-primary-950 mb-8 leading-none">
                Sculpting <span className="text-emerald-600 block italic">Paradise.</span>
              </h1>
              
              <p className="text-primary-900/60 text-xl font-medium max-w-xl leading-relaxed">
                A visual anthology of our finest landscaping transformations and botanical sanctuaries.
              </p>
            </div>

            <div className="flex flex-col items-end gap-6 text-right">
               <div className="flex items-center gap-4 text-emerald-600">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-black uppercase tracking-widest text-xs">{items.length} Masterpieces</span>
               </div>
               <div className="h-20 w-[1px] bg-nature-200"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-nature-100 py-6">
        <div className="section-wrapper flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeCategory === cat 
                    ? 'bg-primary-950 text-white shadow-xl shadow-primary-900/20' 
                    : 'bg-white text-gray-400 hover:text-primary-950 hover:bg-nature-50 border border-nature-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
           
           <div className="hidden lg:flex items-center gap-2 text-primary-950 font-black text-[10px] uppercase tracking-widest opacity-40">
              <LayoutGrid className="w-4 h-4" /> Masonry View
           </div>
        </div>
      </div>

      {/* ── Masonry Grid Section ── */}
      <section className="section-wrapper py-20 pb-40">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
             <div className="relative">
                <div className="w-20 h-20 rounded-3xl border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-emerald-600">
                   <Leaf className="w-8 h-8 animate-pulse" />
                </div>
             </div>
             <p className="text-primary-950 font-display italic text-2xl mt-8 animate-pulse">Curating the exhibition...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-40 bg-white rounded-[4rem] border border-nature-100 shadow-sm">
             <div className="w-24 h-24 bg-nature-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-nature-100">
                <Camera className="w-10 h-10 text-nature-200" />
             </div>
             <h3 className="text-3xl font-display font-black text-primary-950 mb-4">No artworks found in this category</h3>
             <p className="text-gray-400 mb-8 max-w-md mx-auto">We're currently planting new inspiration. Check back soon for updated transformations.</p>
             <button 
              onClick={() => setActiveCategory('All')}
              className="text-emerald-600 font-black uppercase tracking-widest text-xs hover:gap-3 transition-all flex items-center gap-2 mx-auto"
             >
                Show All Works <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8">
            {filteredItems.map(item => (
              <GalleryCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* ── Closing CTA ── */}
      <section className="bg-primary-950 py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 blur-3xl pointer-events-none">
           <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400 rounded-full" />
        </div>
        
        <div className="section-wrapper relative z-10 text-center max-w-4xl mx-auto">
           <h2 className="text-5xl md:text-7xl font-display font-black mb-12 italic leading-tight">
             Inspired by our <span className="text-emerald-400">Green Transformations?</span>
           </h2>
           <p className="text-primary-100/60 text-xl font-medium mb-16 leading-relaxed">
             Every project starts with a conversation. Let's discuss how we can bring botanical elegance to your own private corner of the world.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="/contact" className="px-12 py-5 bg-white text-primary-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-2xl">
                 Consult Our Experts
              </a>
              <div className="flex items-center gap-8 py-3 px-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                 <div className="flex items-center gap-2 text-emerald-400">
                    <Leaf className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">ECO Certified</span>
                 </div>
                 <div className="flex items-center gap-2 text-white/50">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest tracking-[0.2em]">Premium Care</span>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery
