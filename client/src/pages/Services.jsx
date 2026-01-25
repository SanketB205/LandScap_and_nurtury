import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then(res => setServices(res.data))
      .catch(err => {
        console.error(err);
        toast.error("Failed to load services");
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-10">
        Our Services
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map(service => (
          <div key={service._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition">

            <img
              src={service.bannerImage}
              className="h-48 w-full object-cover rounded-t-xl"
            />

            <div className="p-5">
              <h3 className="text-xl font-semibold">
                {service.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {service.shortDescription}
              </p>

              <Link
                to={`/services/${service.slug}`}
                className="inline-block mt-4 text-green-600 font-semibold hover:underline">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
