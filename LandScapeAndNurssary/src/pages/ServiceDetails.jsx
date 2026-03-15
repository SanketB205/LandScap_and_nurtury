import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Share2, 
  Download,
  Loader2,
  CheckCircle2,
  MessageSquare
} from 'lucide-react'
// import { motion } from 'framer-motion'

const ServiceDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    fetchService()
  }, [id])

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/services/${id}`)
      const data = await res.json()
      if (res.ok) {
        setService(data)
      } else {
        navigate('/services')
      }
    } catch (err) {
      console.error('Error fetching service:', err)
      navigate('/services')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-nature-50">
      <Loader2 className="w-12 h-12 text-primary-700 animate-spin mb-4" />
      <p className="text-primary-900 font-serif italic text-xl">Loading project brilliance...</p>
    </div>
  )

  if (!service) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-nature-100">
        <div className="section-wrapper py-4 flex items-center justify-between">
          <Link to="/services" className="flex items-center gap-2 text-primary-700 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-nature-50 rounded-xl text-primary-600 hover:bg-primary-50 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2.5 bg-nature-50 rounded-xl text-primary-600 hover:bg-primary-50 transition-all">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-40 pb-24 px-4 sm:px-0">
        <div className="section-wrapper">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Image Gallery Column */}
            <div className="space-y-6">
              <div 
                className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
              >
                <img 
                  src={service.images[activeImage]} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {service.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-primary-700 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:sticky lg:top-44">
              <div className="flex items-center gap-2 mb-6 text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">
                <Tag className="w-3.5 h-3.5" /> {service.category}
              </div>
              
              <h1 className="text-5xl md:text-6xl font-serif font-black text-primary-950 mb-8 leading-tight">
                {service.title}
              </h1>

              <div className="flex flex-wrap gap-8 mb-12 py-8 border-y border-nature-50">
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-1">Project Date</span>
                   <span className="font-bold text-primary-900 flex items-center gap-2 uppercase text-xs">
                     <Calendar className="w-4 h-4 text-primary-400" />
                     {new Date(service.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                   </span>
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-1">Status</span>
                   <span className="font-bold text-emerald-600 flex items-center gap-2 uppercase text-xs">
                     <CheckCircle2 className="w-4 h-4" />
                     Completed
                   </span>
                </div>
              </div>

              <div className="prose prose-nature max-w-none mb-12">
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                  {service.description}
                </p>
              </div>

              <div className="bg-primary-950 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-primary-900/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <MessageSquare className="w-24 h-24 rotate-12" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 relative z-10 text-emerald-400">Interested in this?</h3>
                <p className="text-primary-100 text-sm mb-8 relative z-10 leading-relaxed max-w-xs">
                  Let's discuss how we can bring similar green beauty to your personal space.
                </p>
                <Link to="/contact" className="relative z-10 inline-block bg-white text-primary-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl active:scale-95">
                  Start Consultation
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Recommended Projects or Footer Decoration */}
      <section className="bg-nature-50 border-t border-nature-100 py-24">
         <div className="section-wrapper text-center">
            <h2 className="text-3xl font-serif font-black text-primary-900 mb-4">Crafted for Excellence</h2>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mb-12"></div>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Every project in our portfolio represents a unique journey of transformation. We believe in creating ecosystems, not just gardens.
            </p>
         </div>
      </section>
    </div>
  )
}

export default ServiceDetails
