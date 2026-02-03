import { Link } from "react-router-dom";
import { servicesData } from "../data/servicesData";

export default function AllServices() {
  return (
    <section className="bg-[#f6fff3] py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-green-900">
            Our Premium <span className="text-lime-600">Services</span>
          </h1>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Janai Landscape Services offers a complete range of professional landscaping,
            nursery, and garden maintenance solutions tailored to your unique needs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-lime-100/50"
            >
              {/* Image */}
              <div className="overflow-hidden relative h-64">
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-green-900 group-hover:text-lime-600 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-relaxed line-clamp-3">
                  {service.intro}
                </p>

                {/* Link to service detail */}
                <div className="mt-8 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-lime-600 font-bold hover:gap-4 transition-all"
                  >
                    Explore Service
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

