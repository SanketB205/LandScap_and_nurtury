
function Hero() {
    return ( 
        
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800">
            We <span className="text-green-600">Are The Landscaper</span>
          </h2>

          <p className="mb-4 leading-relaxed text-gray-600">
            Janai Associates is a full-service landscaping company with a
            straightforward and unique design/build philosophy. We believe in
            having one landscape designer handle the job from its conception on
            paper, to the realization on your property.
          </p>

          <p className="mb-4 leading-relaxed text-gray-600">
            The reason: by doing this you are able to communicate and work with
            a single individual, where you can share your thoughts and ideas to
            bring them, in collaboration, to life.
          </p>

          <p className="mb-6 leading-relaxed text-gray-600">
            The Landscaper is made up of a group of highly skilled landscaping
            professionals who pay a lot of attention to small details. In the 8+
            years of experience our staff keeps your property looking and
            functioning beautifully. Plus our landscapers are fully licensed.
          </p>

          <button className="border-2 border-green-600 text-green-600 px-7 py-3 font-semibold tracking-wide hover:bg-green-600 hover:text-white transition duration-300">
            GET IN TOUCH
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full">
          <img
            src="https://www.evergreenlandscaping.in/wp-content/uploads/2018/09/Landscape-Development-e1537205705856.jpg"
            alt="Landscaping work"
            className="w-full h-full object-cover rounded-md shadow-md"
          />
        </div>
      </div>
      
        
     );
}

export default Hero;