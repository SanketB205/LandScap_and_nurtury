import { useParams } from "react-router-dom";
import { servicesData } from "../data/servicesData";

const ServiceDetails = () => {
  const { slug } = useParams();

  // Find the service data from our local data file
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Service Not Found</h1>
        <p className="mt-4 text-gray-600">The service you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f6fff3] min-h-screen">
      {/* HERO SECTION */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{service.title}</h1>
          <p className="max-w-2xl text-lg font-medium opacity-90">{service.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* FEATURES */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-lime-100 hover:shadow-2xl transition-shadow">
            <h2 className="text-3xl font-bold text-green-800 mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-lime-500 rounded-full"></span>
              Key Features
            </h2>
            <ul className="space-y-4">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-start gap-4 text-gray-700">
                  <div className="mt-1 bg-lime-100 text-lime-700 p-1 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ADVANTAGES */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-lime-100 hover:shadow-2xl transition-shadow">
            <h2 className="text-3xl font-bold text-green-800 mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-green-600 rounded-full"></span>
              Why Choose This?
            </h2>
            <ul className="space-y-4">
              {service.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-4 text-gray-700">
                  <div className="mt-1 bg-green-100 text-green-700 p-1 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* GALLERY */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-green-900 text-center mb-12">Our Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {service.gallery.map((img, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg aspect-video">
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-semibold">Project Case Study {i + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-20 bg-green-800 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <h2 className="text-4xl font-bold mb-6 relative z-10">Interested in this service?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto relative z-10">
            Let Janai Landscape Services bring your vision to life. Contact our experts today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button className="bg-lime-500 hover:bg-lime-400 text-green-900 font-bold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-xl">
              Get Free Quote
            </button>
            <button className="bg-transparent border-2 border-white/30 hover:bg-white/10 text-white font-bold px-10 py-4 rounded-full transition-all">
              Call Us: 9767671968
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;

