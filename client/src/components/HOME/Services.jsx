import image from '../../assets/images/demo.jpg'
import { Link } from 'react-router-dom';
export default function Services() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* LEFT INFO PANEL */}
        <div className="lg:col-span-1 bg-[#f6fff3] p-8 rounded-2xl border-l-4 border-green-600 shadow-sm">
          <h2 className="text-3xl font-extrabold text-green-900 leading-tight">
            Exceptional <br />
            <span className="text-lime-600">Services We Offer</span>
          </h2>

          <p className="mt-5 text-gray-600 text-sm leading-relaxed">
            <span className="font-semibold text-green-800">
              Evergreen Associates
            </span>{" "}
            is synonymous with quality and innovation in landscaping services.
            As a garden planner, we offer complete solutions from garden design,
            lawn installation, maintenance, and sports field development.
          </p>



          <Link
            to="/services"
          ><button className="mt-6 inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-900 transition">
              See All Services →
            </button></Link>
        </div>

        {/* SERVICE CARDS */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
            <img
              src={image}
              alt="Artificial Grass"
              className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="p-6">
              <h3 className="text-lg font-bold text-green-900">
                Artificial Grass Dealer in Pune
              </h3>

              <p className="mt-3 text-sm text-gray-600">
                Importers of premium artificial grass for landscaping, balcony
                gardens, terrace gardens, cricket pitches and football turf.
              </p>

              <button className="mt-4 text-lime-600 font-semibold hover:text-green-700">
                Read More →
              </button>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
            <img
              src={image}
              alt="Lawn Grass Supply"
              className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="p-6">
              <h3 className="text-lg font-bold text-green-900">
                Lawn Grass Supply & Selection
              </h3>

              <p className="mt-3 text-sm text-gray-600">
                We cultivate Korean, Taiwan, American, Selection One & Paspalum
                lawns based on site conditions.
              </p>

              <button className="mt-4 text-lime-600 font-semibold hover:text-green-700">
                Read More →
              </button>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
            <img
              src={image}
              alt="Sports Field"
              className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="p-6">
              <h3 className="text-lg font-bold text-green-900">
                Sports Field Development
              </h3>

              <p className="mt-3 text-sm text-gray-600">
                Expertise in natural sports field development for football,
                cricket and multi-purpose grounds.
              </p>

              <button className="mt-4 text-lime-600 font-semibold hover:text-green-700">
                Read More →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
