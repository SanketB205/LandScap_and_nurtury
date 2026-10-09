import { ArrowRight, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

const ServiceCard = ({ service }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-nature-50 flex flex-col h-full shimmer-dark">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-nature-50">
        <img 
          src={service.images?.[0] || 'https://placehold.co/800x500?text=GreenScape+Service'} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-6 left-6 z-10">
          <span className="bg-white/90 backdrop-blur-md text-primary-900 text-[10px] font-black px-4 py-2 rounded-2xl uppercase tracking-widest shadow-lg">
            {service.category}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link 
            to={`/services/${service._id}`}
            className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-800 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
          >
            <Eye className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-serif font-black text-primary-950 mb-4 group-hover:text-primary-700 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
          {service.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-nature-50">
          <Link 
            to={`/services/${service._id}`}
            className="flex items-center gap-2 text-primary-700 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
          >
            Explore Service <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
