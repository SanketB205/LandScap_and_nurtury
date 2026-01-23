import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import imgDemo from "../assets/images/demo.jpg";
const ServiceDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/services/${slug}`)
      .then(res => setService(res.data));
  }, [slug]);

  if (!service) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-green-700">
        {service.title}
      </h1>

      {/* INTRO */}
      <p className="mt-4 text-gray-600">{service.intro}</p>

      {/* IMAGE */}
      <img
        src={imgDemo}
        alt={service.title}
        className="w-100 mt-6 rounded-lg"
      />

      {/* FEATURES */}
      <h2 className="text-2xl font-semibold mt-10">Features</h2>
      <ul className="list-disc pl-6 text-gray-700 mt-4">
        {service.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      {/* ADVANTAGES */}
      <h2 className="text-2xl font-semibold mt-10">
        Advantages over Natural Grass
      </h2>
      <ul className="list-disc pl-6 text-gray-700 mt-4">
        {service.advantages.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      {/* GALLERY */}
      <h2 className="text-2xl font-semibold mt-10">Our Work</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {
        //service.gallery.map((img, i) => (
          <img
            // key={i}
            src={imgDemo}
            className="rounded-lg object-cover h-40 w-full"
          />
       // ))
        }
      </div>
    </div>
  );
};

export default ServiceDetails;
