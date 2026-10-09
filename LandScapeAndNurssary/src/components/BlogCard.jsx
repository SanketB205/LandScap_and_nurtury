import { Link } from 'react-router-dom'
import { Calendar, Clock, MessageCircle, Heart, ArrowRight, Tag } from 'lucide-react'

const BlogCard = ({ post }) => {
  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-nature-50 flex flex-col shimmer-dark">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Category badge */}
        <div className="absolute top-5 left-5">
          <span
            className="text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest backdrop-blur-md shadow"
            style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: '#065f46' }}
          >
            {post?.category || 'General'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex-1 flex flex-col">
        <h3 className="text-xl font-display font-black text-primary-950 mb-3 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug">
          {post?.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">{post?.excerpt}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> 
            {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recent'}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> 
            {post?.readTime || '5 min read'}
          </span>
        </div>

        {/* Likes / Comments */}
        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-nature-500 mb-6">
          <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-500" /> {post?.likes?.length || 0}</span>
          <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-emerald-500" /> {post?.comments?.length || 0}</span>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-5 border-t border-nature-50">
          <Link 
            to={`/blogs/${post._id}`} 
            className="flex items-center gap-2 text-primary-700 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
          >
            Read Article <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
