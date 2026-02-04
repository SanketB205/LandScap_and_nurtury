import { useState } from "react";
import { motion } from "framer-motion";
import bgImage from "../../assets/images/landscape_bg.jpg";
import Images from "./Images.js";

export default function LandscapeGallery() {
  const [images] = useState(Images);

  const categories = [...new Set(images.map(img => img.category))];

  return (
    <section
      className="min-h-screen px-6 py-16 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto space-y-20">
        {categories.map((category) => (
          <div key={category}>
            
            {/* Heading */}
            <h1 className="text-5xl font-bold text-white mb-6">
              {category}
            </h1>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {images
                .filter(img => img.category === category)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-2xl shadow-xl break-inside-avoid group"
                  >
                    <img
                      src={`${item.image}?auto=format&fit=crop&w=900&q=80`}
                      alt={item.title}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-5">
                        <h3 className="text-lg font-medium text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
