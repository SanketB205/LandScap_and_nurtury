import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Leaf, Star, ShieldCheck, Truck, Headphones,
  Shovel, Building2, TreePine, Palette, ChevronRight, Loader2
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ServiceCard from '../components/ServiceCard'
import { products, galleryImages, stats } from '../data/dummyData'

const services = [
  {
    id: 1,
    title: 'Landscaping Design',
    tag: 'Outdoor',
    icon: Shovel,
    gradient: 'from-green-500 to-emerald-600',
    description: 'Transform your outdoor spaces into stunning, sustainable landscapes tailored to your lifestyle.',
    features: ['Custom garden layout', '3D design previews', 'Plant selection guidance'],
  },
  {
    id: 2,
    title: 'Terrace Gardens',
    tag: 'Rooftop',
    icon: Building2,
    gradient: 'from-teal-500 to-green-600',
    description: 'Convert unused rooftops into lush green retreats with functional beauty.',
    features: ['Waterproofing solutions', 'Weight-optimized planters', 'Irrigation systems'],
  },
  {
    id: 3,
    title: 'Vertical Gardens',
    tag: 'Indoor / Outdoor',
    icon: TreePine,
    gradient: 'from-lime-500 to-green-500',
    description: 'Maximize greenery in minimal space with our stunning vertical garden installations.',
    features: ['Wall-mounted systems', 'Self-watering units', 'Air-purifying plants'],
  },
  {
    id: 4,
    title: 'Garden Design',
    tag: 'Custom',
    icon: Palette,
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Personalized garden design consulting for homes, offices, and commercial spaces.',
    features: ['Site assessment', 'Seasonal planting plans', 'Ongoing maintenance'],
  },
]

const testimonials = [
  {
    id: 1,
    name: 'Pooja Sharma',
    role: 'Homeowner, Pune',
    text: 'GreenScape turned my bare terrace into an absolute paradise. I can\'t believe how beautiful it looks!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop',
  },
  {
    id: 2,
    name: 'Rahul Desai',
    role: 'Office Manager, Mumbai',
    text: 'The vertical garden they installed in our office lobby has transformed the entire atmosphere.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
  },
  {
    id: 3,
    name: 'Nisha Kulkarni',
    role: 'Interior Designer',
    text: 'Exceptional quality plants and outstanding service. My clients always ask where I source the plants!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop',
  },
]

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        if (res.ok) {
          setFeaturedProducts(data.filter(p => p.isFeatured).slice(0, 4))
        }
      } catch (err) {
        console.error('Error fetching featured products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="pt-16 md:pt-20">
      {/* ───── HERO SECTION ───── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop"
            alt="Beautiful landscaping garden"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay" />
          {/* Extra gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl animate-float hidden md:block" />
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-secondary-300/15 rounded-full blur-3xl animate-float hidden md:block" style={{ animationDelay: '1s' }} />

        {/* Content */}
        <div className="section-wrapper relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="badge bg-white/20 text-white border border-white/30 mb-6 text-sm animate-fade-in">
              <Leaf className="w-3.5 h-3.5" />
              India's Premier Nursery & Landscaping Service
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-slide-up text-shadow">
              Transform Your
              <span className="block text-secondary-300">Space With</span>
              Nature
            </h1>

            <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-xl animate-slide-up">
              Discover premium plants, expert landscaping services, and personalized garden design solutions for your dream green space.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up">
              <Link to="/products" className="btn-primary text-base px-8 py-4 shadow-lg">
                <Leaf className="w-5 h-5" />
                Explore Plants
              </Link>
              <Link to="/services" className="btn-outline-white text-base px-8 py-4">
                Our Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/20">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <div className="w-px h-8 bg-white/40" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* ───── TRUST BADGES ───── */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="section-wrapper">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: 'Free Delivery', sub: 'On orders above ₹999' },
              { icon: ShieldCheck, label: '100% Authentic', sub: 'Genuine nursery plants' },
              { icon: Star, label: 'Expert Support', sub: 'Plant care guidance' },
              { icon: Headphones, label: '7-Day Replacement', sub: 'Plant health guarantee' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary-800" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURED PRODUCTS ───── */}
      <section className="py-20 bg-nature-cream">
        <div className="section-wrapper">
          <div className="text-center mb-12">
            <div className="badge mx-auto mb-4">
              <Leaf className="w-3 h-3" /> Featured Plants
            </div>
            <h2 className="section-title">Our Popular Plants</h2>
            <p className="section-subtitle">
              Handpicked from our nursery — healthy, beautiful, ready for your home
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-nature-700 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/products" className="btn-secondary">
              View All Plants
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── SERVICES HIGHLIGHT ───── */}
      <section className="py-20 bg-white">
        <div className="section-wrapper">
          <div className="text-center mb-12">
            <div className="badge mx-auto mb-4">
              <Shovel className="w-3 h-3" /> What We Do
            </div>
            <h2 className="section-title">Our Expert Services</h2>
            <p className="section-subtitle">
              From concept to creation — we craft garden experiences that inspire
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── ABOUT STRIP ───── */}
      <section className="py-20 bg-nature-sand">
        <div className="section-wrapper">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=700&h=500&fit=crop"
                alt="Our nursery"
                className="rounded-3xl shadow-card-hover w-full object-cover h-80 md:h-96"
              />
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-4 shadow-card hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-primary-800" />
                  </div>
                  <div>
                    <p className="font-bold text-primary-800 text-xl">15+</p>
                    <p className="text-xs text-gray-500">Years Growing</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="badge mb-4">
                <Leaf className="w-3 h-3" /> About GreenScape
              </div>
              <h2 className="section-title text-left mb-4">Growing Green Since 2010</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                GreenScape Nursery was born from a passion for plants and a vision to bring nature closer to people. For over 15 years, we've been transforming spaces—from cozy apartment corners to sprawling corporate campuses.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our team of horticulturists, garden designers, and plant enthusiasts work together to deliver the most vibrant, healthy plants and the most beautiful garden designs in the region.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map(stat => (
                  <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-card text-center">
                    <div className="text-2xl font-bold text-primary-800">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn-primary">
                Learn Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── GALLERY PREVIEW ───── */}
      <section className="py-20 bg-white">
        <div className="section-wrapper">
          <div className="text-center mb-12">
            <div className="badge mx-auto mb-4">
              <Palette className="w-3 h-3" /> Our Work
            </div>
            <h2 className="section-title">Garden Gallery</h2>
            <p className="section-subtitle">A glimpse of the green spaces we've created</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={img.id}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                  i === 0 ? 'row-span-2' : ''
                }`}
                style={{ height: i === 0 ? '440px' : '200px' }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="badge text-white bg-white/20 border border-white/30">{img.category}</span>
                    <p className="text-white font-semibold mt-1">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="py-20 bg-nature-cream">
        <div className="section-wrapper">
          <div className="text-center mb-12">
            <div className="badge mx-auto mb-4">
              <Star className="w-3 h-3" /> Testimonials
            </div>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real stories from our happy green community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA BANNER ───── */}
      <section className="py-20 bg-gradient-nature relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="section-wrapper relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Go Green?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Whether you want one plant or a complete garden makeover — we're here to make it happen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="bg-white text-primary-800 font-bold px-8 py-4 rounded-full hover:bg-secondary-100 transition-colors shadow-lg">
              Shop Plants
            </Link>
            <Link to="/contact" className="btn-outline-white px-8 py-4">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
