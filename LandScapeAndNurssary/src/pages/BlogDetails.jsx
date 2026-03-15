import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Calendar, Clock, User, MessageCircle, Heart, ArrowLeft, Send, Loader2, Leaf 
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const BlogDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const { user, token } = useAuth()

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${id}`)
      const data = await res.json()
      if (res.ok) {
        setBlog(data)
      }
    } catch (err) {
      console.error('Error fetching blog:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (!user) return alert('Please login to like this post')
    try {
      const res = await fetch(`/api/blogs/${id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        fetchBlog()
      }
    } catch (err) {
      console.error('Error liking blog:', err)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!user) return alert('Please login to comment')
    if (!comment.trim()) return

    setSubmittingComment(true)
    try {
      const res = await fetch(`/api/blogs/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment })
      })
      const data = await res.json()
      if (res.ok) {
        setBlog({ ...blog, comments: data })
        setComment('')
      }
    } catch (err) {
      console.error('Error adding comment:', err)
    } finally {
      setSubmittingComment(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-nature-50/30">
        <Loader2 className="w-12 h-12 text-primary-700 animate-spin mb-4" />
        <p className="text-primary-950 font-display italic text-xl">Loading story...</p>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-nature-50/30">
        <h2 className="text-4xl font-display font-black text-primary-950 mb-4">Blog Not Found</h2>
        <Link to="/blogs" className="text-emerald-600 font-black uppercase tracking-widest text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    )
  }

  const isLikedByMe = user && blog.likes.includes(user._id)

  return (
    <div className="min-h-screen bg-nature-50/30">
      {/* ── Progress/Back Nav ── */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-nature-100 py-4">
        <div className="section-wrapper flex items-center justify-between">
          <Link to="/blogs" className="flex items-center gap-2 text-primary-700 font-black text-xs uppercase tracking-widest hover:text-emerald-600 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Collection
          </Link>
          <div className="flex items-center gap-6">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 transition-all ${isLikedByMe ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}
            >
              <Heart className={`w-5 h-5 ${isLikedByMe ? 'fill-current' : ''}`} />
              <span className="text-xs font-black">{blog.likes.length}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-400">
               <MessageCircle className="w-5 h-5" />
               <span className="text-xs font-black">{blog.comments.length}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="section-wrapper py-16 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6 text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px]">
            <div className="w-10 h-[1px] bg-emerald-400"></div>
            {blog.category}
            <div className="w-10 h-[1px] bg-emerald-400"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black text-primary-950 mb-8 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 font-medium">
             <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                   <User className="w-5 h-5" />
                </div>
                <span>By {blog.author?.name || 'Admin'}</span>
             </div>
             <div className="w-1 h-1 rounded-full bg-gray-300" />
             <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
             </div>
             <div className="w-1 h-1 rounded-full bg-gray-300" />
             <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
             </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-16 aspect-[21/10]">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-primary max-w-none text-gray-600 leading-relaxed font-medium mb-20 whitespace-pre-wrap">
          {blog.content}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 py-8 border-t border-nature-100 mb-20">
             {blog.tags.map(tag => (
               <span key={tag} className="px-4 py-2 bg-white rounded-full text-xs font-black uppercase tracking-widest text-primary-700 border border-nature-100">
                  # {tag}
               </span>
             ))}
          </div>
        )}

        {/* Interaction Bar */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-nature-50 mb-20 text-center">
            <h3 className="text-2xl font-display font-black text-primary-950 mb-4">Enjoyed the article?</h3>
            <p className="text-gray-500 mb-8">Show your love for this green knowledge!</p>
            <button 
              onClick={handleLike}
              className={`group flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest mx-auto transition-all shadow-xl ${isLikedByMe ? 'bg-rose-50 text-rose-500 shadow-rose-900/10' : 'bg-primary-950 text-white shadow-primary-900/20'}`}
            >
              <Heart className={`w-5 h-5 transition-transform group-hover:scale-125 ${isLikedByMe ? 'fill-current' : ''}`} />
              {isLikedByMe ? 'You Liked This' : `Like This Article (${blog.likes.length})`}
            </button>
        </div>

        {/* Comments Section */}
        <div id="comments" className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-nature-50">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl font-display font-black text-primary-950">Comments ({blog.comments.length})</h3>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
               <MessageCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>

          {/* Comment Form */}
          {user ? (
            <form onSubmit={handleComment} className="mb-12">
               <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts or ask a question..."
                className="w-full px-6 py-4 bg-nature-50 border border-nature-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all font-medium text-sm text-gray-800 placeholder-gray-400 resize-none mb-4"
                rows={4}
                required
               />
               <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={submittingComment}
                    className="flex items-center gap-2 px-8 py-3.5 bg-primary-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-950 transition-all disabled:opacity-50 shadow-xl shadow-primary-900/20"
                  >
                    {submittingComment ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Post Comment
                  </button>
               </div>
            </form>
          ) : (
            <div className="p-8 bg-nature-50 border border-dashed border-nature-200 rounded-[2rem] text-center mb-12">
               <p className="text-primary-900 font-medium mb-4">You need to be logged in to join the conversation.</p>
               <Link to="/login" className="inline-block px-8 py-3 bg-white text-primary-950 border border-primary-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary-50 transition-all">
                  Login to Comment
               </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-8">
            {blog.comments.length === 0 ? (
               <div className="text-center py-10 opacity-50">
                  <p className="italic">Be the first to share a thought on this article!</p>
               </div>
            ) : (
              blog.comments.map((c, i) => (
                <div key={i} className="flex gap-4 md:gap-6 group">
                   <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-xl">
                      {c.name?.charAt(0) || 'U'}
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                         <h4 className="font-black text-primary-950 text-sm italic">{c.name}</h4>
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {new Date(c.createdAt).toLocaleDateString()}
                         </span>
                      </div>
                      <div className="p-5 bg-nature-50 rounded-[1.5rem] rounded-tl-none group-hover:bg-nature-100 transition-colors">
                         <p className="text-gray-600 text-sm leading-relaxed font-medium">{c.comment}</p>
                      </div>
                   </div>
                </div>
              ))
            )}
          </div>
        </div>
      </article>

      {/* Trust Section */}
      <section className="bg-emerald-900 py-20 text-white overflow-hidden relative">
        <div className="section-wrapper relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="max-w-xl">
            <h2 className="text-4xl font-display font-black mb-6">Want more green wisdom?</h2>
            <p className="text-emerald-100 font-medium opacity-80 mb-8">
              Explore our full collection of plant care guides and expert landscaping tips.
            </p>
            <Link to="/blogs" className="inline-block bg-white text-primary-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl">
              Explore All Blogs
            </Link>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-[1px] h-20 bg-emerald-800 hidden md:block"></div>
             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-400">
                   <Leaf className="w-5 h-5" />
                   <span className="font-black uppercase tracking-widest text-xs">Knowledge Hub</span>
                </div>
                <p className="text-xs text-emerald-200/60 font-medium max-w-[200px]">Empowering you with nature's secrets since 2010.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogDetails
