function HeroSection() {
    return (
        <>
    <div className="w-full bg-white text-gray-700 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT : CONTACT FORM */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-semibold mb-2">
            Send <span className="text-green-600">Us A Message</span>
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Feel free to ask any landscaping or gardening questions over the phone,
            or get in touch via our contact form.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" method="" action="">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-200 px-4 py-3 focus:outline-none focus:border-green-600"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-200 px-4 py-3 focus:outline-none focus:border-green-600"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-200 px-4 py-3 focus:outline-none focus:border-green-600"
            />

            <select className="border border-gray-200 px-4 py-3 focus:outline-none focus:border-green-600">
              <option>Landscape Development</option>
              <option>Garden Maintenance</option>
              <option>Plant Nursery</option>
            </select>

            <textarea
              placeholder="Your Message"
              rows="5"
              className="md:col-span-2 border border-gray-200 px-4 py-3 focus:outline-none focus:border-green-600"
            />


            <div className="md:col-span-2 flex flex-wrap gap-4 mt-4 ">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm font-medium"
              >
               <i class="fa-solid fa-message"></i> REQUEST QUOTE
              </button>

              <a
                href="tel:9767671968"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm font-medium"
              >
               <i className="fa-solid fa-phone"></i> CALL US 9767671968
              </a>
            </div>
          </form>
        </div>

        {/* RIGHT : CONTACT DETAILS */}
        <div className="space-y-8">
          {/* Contact Details */}
          <div className="border border-gray-200 p-6">
            <h3 className="text-xl font-semibold mb-4">
              Contact <span className="text-green-600">Details</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Janai Landscape Services <br />
             Belhekar Wasti, <br />
              Haveli, Pune – 412308 <br /><br />
              <strong>Phone:</strong> 9767671968 <br />
              <strong>Email:</strong> demomail@gmail.com
            </p>
          </div>

          <div className="border border-gray-200 p-2">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=BelhekarWasti,Haveli,Pune&output=embed"
              className="w-full h-64 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
        </>
       
    )
}

export default HeroSection;