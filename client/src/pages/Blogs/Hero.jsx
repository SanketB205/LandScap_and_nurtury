import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Hero() {
  const [blogPosts, setBlogPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogPosts(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div >
      {/* Blog Cards Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          Latest Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const description = post.description;
            // Shorten text logic: e.g., show first 60 chars
            const shortDescription =
              description.length > 60
                ? description.substring(0, 60) + "..."
                : description;

            return (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={`${post.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={post.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-700 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 transition-all duration-300">
                    {shortDescription}
                  </p>

                  <Link
                    to={`/blog/${post._id}`}
                    className="text-green-600 font-semibold hover:underline focus:outline-none"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call To Action Section */}
      <div className="bg-green-600 text-white text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Garden?
        </h2>
        <p className="mb-6 text-lg">
          Contact our landscaping experts today and bring your dream garden to life.
        </p>
        <button onClick={() => navigate('/contact')} className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full hover:bg-green-100 transition">
          Get Free Consultation
        </button>
      </div>

    </div>

  );
}

export default Hero;




