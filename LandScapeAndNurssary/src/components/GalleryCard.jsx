import { useState } from 'react'
import { Maximize2, X } from 'lucide-react'

const GalleryCard = ({ item }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <>
      <div 
        className="group relative break-inside-avoid mb-6 cursor-pointer"
        onClick={() => setIsPreviewOpen(true)}
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-nature-100 shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary-900/20 group-hover:-translate-y-2">
          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
               {item.category}
             </span>
          </div>

          {/* Action Overlay */}
          <div className="absolute inset-0 bg-primary-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-950 transform scale-50 group-hover:scale-100 transition-transform duration-500 border-4 border-white/20">
                <Maximize2 className="w-5 h-5" />
             </div>
          </div>

          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
          />

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
             <h3 className="text-white font-display font-black text-lg mb-1">{item.title}</h3>
             <p className="text-white/70 text-xs font-medium line-clamp-1 italic">{item.description}</p>
          </div>
        </div>
      </div>

      {/* Lightbox Preview */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-primary-950/95 backdrop-blur-xl"
            onClick={() => setIsPreviewOpen(false)}
          />
          
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10"
            onClick={() => setIsPreviewOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-scale-up flex flex-col md:flex-row">
             <div className="md:w-2/3 bg-nature-50">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain bg-nature-100"
                />
             </div>
             <div className="md:w-1/3 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-emerald-600 font-black uppercase tracking-widest text-xs mb-4">
                  {item.category}
                </span>
                <h2 className="text-4xl font-display font-black text-primary-950 mb-6 leading-tight">
                  {item.title}
                </h2>
                <div className="w-12 h-1 bg-emerald-500 mb-8 rounded-full"></div>
                <p className="text-gray-600 leading-relaxed font-medium italic">
                  "{item.description}"
                </p>
                
                <div className="mt-12 flex items-center gap-4 py-6 border-t border-nature-100">
                   <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-700">
                      <Maximize2 className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Captured in</p>
                      <p className="text-sm font-bold text-primary-950">{new Date(item.createdAt).getFullYear()}</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GalleryCard
