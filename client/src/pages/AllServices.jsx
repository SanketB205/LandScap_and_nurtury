const servicesData = [
  {
    title: "Artificial Grass Installation",
    img: "https://images.unsplash.com/photo-1598514982205-f45d6d5ed3f1",
    desc: "Premium artificial grass installation for lawns, balconies, terraces, football and cricket grounds."
  },
  {
    title: "Natural Lawn Grass Supply",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    desc: "Korean, Taiwan, American, Selection One & Paspalum lawn varieties supplied and installed."
  },
  {
    title: "Garden Design & Development",
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
    desc: "Complete garden planning, plantation, irrigation and lighting solutions."
  },
  {
    title: "Sports Field Development",
    img: "https://images.unsplash.com/photo-1587502536263-9298d2fbd3f6",
    desc: "Natural sports field development for football, cricket and multi-purpose grounds."
  },
  {
    title: "Terrace & Balcony Garden",
    img: "https://images.unsplash.com/photo-1598515213694-70c3f46c22b5",
    desc: "Smart green solutions for terrace and balcony gardens."
  },
  {
    title: "Garden Maintenance",
    img: "https://images.unsplash.com/photo-1524594154908-edd5534f0c87",
    desc: "Regular garden maintenance including trimming, fertilization and lawn care."
  }
];

export default function AllServices() {
  return (
    <section className="bg-[#f6fff3] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-green-900">
            Our <span className="text-lime-600">Services</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Complete landscaping & nursery services for residential, commercial
            and sports projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={service.img}
                alt={service.title}
                className="h-52 w-full object-cover hover:scale-105 transition duration-500"
              />

              <div className="p-6">
                <h3 className="text-lg font-bold text-green-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm text-gray-600">
                  {service.desc}
                </p>

                <button className="mt-4 text-lime-600 font-semibold hover:text-green-800">
                  Enquire Now →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
