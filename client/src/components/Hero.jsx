import gardener from "../assets/images/download.jpg"; // put image in src/assets/

export default function Hero() {
  return (
    <section className="relative overflow-x-hidden bg-[#f6fff3]">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-4 text-sm font-semibold text-green-700 bg-green-100 px-4 py-1 rounded-full">
            <i class="fa-brands fa-canadian-maple-leaf"></i> Transforming lawns into lush green
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
            Smart Lawn Care, <br />
            <span className="text-lime-600">Stunning Results</span>
          </h1>

          <p className="mt-5 text-gray-600 max-w-lg">
            At Evergreen Landscapes, we know a great lawn doesn’t just happen.
            That’s why we combine expert knowledge with eco-friendly solutions.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full shadow-lg transition">
              Get Your Free Estimate →
            </button>

            <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=200"
                alt="lawn care"
                className="w-14 h-14 object-cover rounded-lg"
              />
              <div>
                <p className="text-sm font-semibold text-green-900">
                  Get 20% off for lawn care
                </p>
                <span className="text-xs text-gray-500">Register Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          <div className="absolute -bottom-10 w-72 h-72 bg-lime-400 rounded-full blur-3xl opacity-30"></div>

          <img
            src={gardener}
            alt="Gardener mowing lawn"
            className="relative z-10 w-full max-w-md drop-shadow-2xl"
          />
        </div>
      </div>

      {/* TRUSTED BY */}
      <div className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-sm font-semibold text-gray-500 mb-6">
            Trusted By 14K+ Companies Worldwide
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <span className="font-bold text-lg">Lightbox</span>
            <span className="font-bold text-lg">Logoipsum</span>
            <span className="font-bold text-lg">Logoipsum</span>
            <span className="font-bold text-lg">Logoipsum</span>
            <span className="font-bold text-lg">Feather</span>
          </div>
        </div>
      </div>
    </section>
  );
}
