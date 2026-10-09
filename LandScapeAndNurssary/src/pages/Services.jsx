import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
import { 
  Leaf, 
  Paintbrush, 
  Home, 
  Expand, 
  Sprout, 
  Search,
  Loader2,
  Maximize2,
  X
} from 'lucide-react'
import ServiceCard from '../components/ServiceCard'

const categories = [
  { id: 'All', label: 'All Projects', icon: Leaf },
  { id: 'Garden Designs', label: 'Garden Designs', icon: Paintbrush },
  { id: 'Terrace Gardens', label: 'Terrace Gardens', icon: Home },
  { id: 'Vertical Gardens', label: 'Vertical Gardens', icon: Expand },
  { id: 'Nursery Plants', label: 'Nursery Plants', icon: Sprout },
  { id: 'Gallery', label: 'Inspiration Gallery', icon: Maximize2 },
]

const Services = () => {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [lightboxImage, setLightboxImage] = useState(null)

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    filterServices()
  }, [activeCategory, searchQuery, services])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services')
      const data = await res.json()
      if (res.ok) {
        setServices(data)
      }
    } catch (err) {
      console.error('Error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterServices = () => {
    let result = services
    
    if (activeCategory !== 'All') {
      result = result.filter(s => s.category === activeCategory)
    }
    
    if (searchQuery) {
      result = result.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    setFilteredServices(result)
  }

  return (
    <div className="min-h-screen bg-nature-50/30">
      <section className="relative pt-32 pb-24 overflow-hidden text-white" style={{ backgroundColor: '#0d3311' }}>
        {/* Leaf texture overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
        </div>
        
        {/* Decorative glow blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4ade80, transparent 70%)' }} />
        <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #86efac, transparent 70%)' }} />
        
        <div className="section-wrapper relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px]">
            <div className="w-12 h-[1px] bg-emerald-500/50"></div>
            Crafting Green Masterpieces
            <div className="w-12 h-[1px] bg-emerald-500/50"></div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-none">
            Landscaping <span className="text-emerald-400 italic">&</span> Services
          </h1>
          
          <p className="text-primary-200 text-lg max-w-2xl mx-auto font-medium">
            From urban balconies to sprawling estates, we transform spaces into sustainable floral sanctuaries.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-nature-100 shadow-sm mb-16">
        <div className="section-wrapper py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 slim-scrollbar max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 ${
                  activeCategory === cat.id 
                  ? 'text-white shadow-xl shadow-emerald-900/20' 
                  : 'text-primary-900 hover:bg-nature-100'
                }`}
                style={activeCategory === cat.id ? { backgroundColor: '#0d3311' } : {}}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600/50" />
            <input 
              type="text" 
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 font-medium text-sm transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-wrapper py-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 text-primary-700 animate-spin mb-4" />
            <p className="text-primary-900 font-serif italic text-xl">Cultivating results...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-40">
            <div className="w-24 h-24 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Leaf className="w-10 h-10 text-primary-300" />
            </div>
            <h3 className="text-3xl font-serif font-black text-primary-900 mb-4">No services found</h3>
            <p className="text-gray-500 font-medium">Try adjusting your filters or search query.</p>
          </div>
        ) : activeCategory === 'Gallery' ? (
          /* Masonry-style Grid for Gallery */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredServices.map((service) => (
              <div 
                key={service._id}
                className="break-inside-avoid mb-8"
              >
                <div 
                  className="group relative rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  onClick={() => service.images?.[0] && setLightboxImage(service.images[0])}
                >
                  <img src={service.images?.[0] || 'https://placehold.co/800x500?text=Gallery+Item'} alt={service.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <h4 className="text-white text-xl font-serif font-bold">{service.title}</h4>
                    <div className="flex items-center justify-between mt-2">
                       <Link 
                        to={`/services/${service._id}`} 
                        className="text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                       >
                         View Details
                       </Link>
                       <Maximize2 className="w-5 h-5 text-white/50" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Standard Card Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredServices.map((service) => (
              <div key={service._id}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl"
          style={{ backgroundColor: 'rgba(13, 51, 17, 0.95)' }}
          onClick={() => setLightboxImage(null)}
        >
          <button className="absolute top-10 right-10 p-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all">
            <X className="w-8 h-8" />
          </button>
          <img 
            src={lightboxImage} 
            alt="Zoomed" 
            className="max-w-full max-h-full rounded-3xl shadow-3xl shadow-black/50 border-4 border-white/10"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Trust Banner */}
      <section className="bg-emerald-900 py-20 text-white overflow-hidden relative">
        <div className="section-wrapper relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
             <h2 className="text-4xl font-serif font-black mb-6">Have a custom green vision?</h2>
             <p className="text-emerald-100 font-medium opacity-80 mb-8">
               Our designers work closely with you to create personalized landscapes that match your lifestyle and local ecology.
             </p>
             <Link to="/contact" className="bg-white text-primary-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl">
               Get Free Consultation
             </Link>
          </div>
          <div className="flex gap-8">
             <div className="text-center">
               <p className="text-5xl font-black text-emerald-400 mb-2">500+</p>
               <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">Gardens Built</p>
             </div>
             <div className="w-[1px] bg-emerald-800 self-stretch"></div>
             <div className="text-center">
               <p className="text-5xl font-black text-emerald-400 mb-2">15+</p>
               <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">Years Experience</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
