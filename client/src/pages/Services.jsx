import { Link } from "react-router-dom";
import { servicesData } from "../data/servicesData";

const ServicesPage = () => {
  return (
    <div className="bg-[#f6fff3] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-green-900">
            Our <span className="text-lime-600">Services</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl">
            Explore our wide range of professional landscaping and nursery services designed to create and maintain your perfect outdoor space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map((service, index) => (
            <div key={index}
              className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group">

              <div className="h-64 overflow-hidden relative">
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all"></div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-green-900 group-hover:text-lime-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-relaxed line-clamp-3">
                  {service.intro}
                </p>

                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 mt-8 text-lime-600 font-bold hover:gap-4 transition-all">
                  Read More
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
