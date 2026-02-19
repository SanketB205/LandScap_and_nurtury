import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BlogDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching blog post:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) {
        return <div className="text-center py-20 text-xl">Loading...</div>;
    }

    if (!post) {
        return <div className="text-center py-20 text-xl text-red-600">Blog post not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <Link to="/blog" className="text-green-600 font-semibold mb-6 inline-block hover:underline">
                &larr; Back to Blogs
            </Link>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-80 object-cover"
                />

                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
                    <p className="text-gray-500 text-sm mb-6">Published on {new Date(post.createdAt).toLocaleDateString()}</p>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                        {post.description.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
