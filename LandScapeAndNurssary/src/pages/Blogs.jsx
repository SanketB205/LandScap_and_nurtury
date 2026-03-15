import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, Sprout, Leaf, Sun, Wind, ChevronRight, Loader2, BookOpen, Calendar, Clock 
} from 'lucide-react'
import BlogCard from '../components/BlogCard'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { name: 'All', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Plant Care', icon: <Sprout className="w-4 h-4" /> },
    { name: 'Garden Design', icon: <Leaf className="w-4 h-4" /> },
    { name: 'Plant Science', icon: <Sun className="w-4 h-4" /> },
    { name: 'Seasonal Guide', icon: <Wind className="w-4 h-4" /> },
  ]

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    console.log('Blogs state updated:', blogs)
  }, [blogs])

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs')
      const data = await res.json()
      if (res.ok) {
        setBlogs(data)
      }
    } catch (err) {
      console.error('Error fetching blogs:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory
    const title = blog.title || ''
    const excerpt = blog.excerpt || ''
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Large featured post (most recent)
  const featuredPost = filteredBlogs[0]
  const otherPosts = filteredBlogs.slice(1)

  return (
    <div className="min-h-screen bg-nature-50/30">
      
      {/* ── Hero Header ── */}
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
            <div className="w-12 h-[1px] bg-emerald-500/50"></div>
            The Green Journal
            <div className="w-12 h-[1px] bg-emerald-500/50"></div>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-none">
            Nature's <span className="text-emerald-400 italic">Secrets</span> & Stories
          </h1>

          <p className="text-primary-200 text-lg max-w-2xl mx-auto font-medium mb-12">
            Dive into our collection of expert plant care guides, landscaping inspiration, and tales from the greenhouse.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 text-white/80">
            <div className="text-center">
              <p className="text-3xl font-display font-black text-white">50+</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Guides</p>
            </div>
            <div className="w-[1px] h-10 bg-white/10"></div>
            <div className="text-center">
              <p className="text-3xl font-display font-black text-white">12k</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Readers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-nature-100 mb-16 shadow-sm">
        <div className="section-wrapper flex flex-col md:flex-row items-center justify-between gap-6 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 ${
                  activeCategory === cat.name
                    ? 'text-white shadow-xl shadow-emerald-900/20'
                    : 'text-primary-900 hover:bg-nature-100'
                }`}
                style={activeCategory === cat.name ? { backgroundColor: '#0d3311' } : {}}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600/50" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-nature-50 border border-nature-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 font-medium text-sm transition-all"
            />
          </div>
        </div>
      </div>

      <div className="section-wrapper pb-32">
        {loading ? (
           <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-12 h-12 text-primary-700 animate-spin mb-4" />
              <p className="text-primary-900 font-display italic text-xl">Loading nature's wisdom...</p>
           </div>
        ) : filteredBlogs.length === 0 ? (
           <div className="text-center py-32">
              <div className="w-20 h-20 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                 <Search className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-display font-black text-primary-950 mb-2">No Matching Stories</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
           </div>
        ) : (
          <>
            {/* Featured Post */}
            {activeCategory === 'All' && searchTerm === '' && featuredPost && (
              <Link to={`/blogs/${featuredPost._id}`} className="group mb-20 block">
                <div className="relative grid lg:grid-cols-2 gap-12 bg-white rounded-[4rem] p-8 md:p-12 shadow-sm border border-nature-50 overflow-hidden items-center group-hover:shadow-2xl transition-all duration-700">
                  {/* Image */}
                  <div className="relative aspect-[16/10] lg:aspect-square rounded-[3rem] overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-8 left-8">
                       <span className="bg-emerald-600 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                          Featured Article
                       </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 text-xs font-black text-emerald-600 uppercase tracking-widest mb-6">
                      <span className="px-3 py-1 bg-emerald-50 rounded-lg">{featuredPost.category}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="text-gray-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-display font-black text-primary-950 mb-6 group-hover:text-emerald-700 transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-lg text-gray-500 leading-relaxed mb-10 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-8 text-xs font-black uppercase tracking-widest text-primary-900 border-t border-nature-50 pt-8">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-500" /> 
                        {featuredPost?.readTime || '5 min read'}
                      </span>
                      <span className="flex items-center gap-2">
                        Read Story <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Other Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {(activeCategory === 'All' && searchTerm === '' ? otherPosts : filteredBlogs).map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── CTA Banner ── */}
      <section className="bg-emerald-900 py-24 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
        </div>
        
        <div className="section-wrapper relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">Join our Green <span className="text-emerald-400 italic">Community</span></h2>
            <p className="text-lg text-emerald-100 opacity-80 mb-10">
              Subscribe to get the latest plant care tips, exclusive nursery offers, and botanical inspiration delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0">
               <input 
                type="email" 
                placeholder="Email address"
                className="flex-1 bg-emerald-800/50 border border-emerald-700 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-400 font-medium transition-all"
               />
               <button className="bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl active:scale-95">
                 Join Now
               </button>
            </form>
          </div>
          <div className="shrink-0 w-64 h-64 lg:w-80 lg:h-80 bg-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-3xl relative">
             <div className="absolute inset-4 border border-white/10 rounded-full animate-spin-slow"></div>
             <Leaf className="w-24 h-24 text-emerald-400" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blogs
