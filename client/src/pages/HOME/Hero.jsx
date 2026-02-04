import { useNavigate } from "react-router-dom";
import gardener from "../../assets/images/download.jpg"; // put image in src/assets/

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-x-hidden bg-[#f6fff3]">

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-4 text-sm font-semibold text-green-700 bg-green-100 px-4 py-1 rounded-full">
            <i className="fa-brands fa-canadian-maple-leaf"></i> Transforming lawns into lush green
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
            Smart Lawn Care, <br />
            <span className="text-lime-600">Stunning Results</span>
          </h1>

          <p className="mt-5 text-gray-600 max-w-lg">
            At Janai Landscape Services, we know a great lawn doesn’t just happen.
            That’s why we combine expert knowledge with eco-friendly solutions.
          </p>

          {/* SERVICE SELECTION DROPDOWN */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="relative w-full max-w-xs">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    navigate(`/services/${e.target.value}`);
                  }
                }}
                className="w-full bg-white text-green-900 font-bold px-6 py-4 rounded-2xl shadow-lg border-2 border-lime-100 focus:border-lime-500 outline-none appearance-none transition-all cursor-pointer"
              >
                <option value="">Select a Service...</option>
                <option value="garden-design">Garden Design</option>
                <option value="nursery-plants">Nursery Plants</option>
                <option value="lawn-care">Lawn Care</option>
                <option value="irrigation">Irrigation Systems</option>
                <option value="artificial-grass-installation">Artificial Grass</option>
                <option value="natural-lawn-grass-supply">Natural Lawn</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-lime-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            <button
              onClick={() => navigate('/services')}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-2xl shadow-lg transition font-bold"
            >
              Browse All Services
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-lime-50 group hover:shadow-xl transition-all">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=200"
                alt="lawn care"
                className="w-16 h-16 object-cover rounded-xl group-hover:scale-105 transition"
              />
              <div>
                <p className="text-sm font-bold text-green-900 leading-tight">
                  Get 20% off for first-time <br /> lawn care maintenance
                </p>
                <span className="text-xs text-lime-600 font-bold mt-1 block">Limited Time Offer</span>
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
