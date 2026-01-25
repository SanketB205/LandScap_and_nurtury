import bgImage from "../../assets/images/landscape_bg.jpg"
function Banner() {
    return (
    <div className="w-full text-gray-700 font-sans">
      <div
        className="bg-gray-100 bg-cover bg-center text-center py-20 px-4"
        style={{
          backgroundImage: `url(${bgImage})`
        }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3">
          Contact Us
        </h1>
        <p className="text-gray-500 text-base md:text-lg">
          Give us a call or fill in the contact form below and we will get back to you!
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-5 text-sm text-gray-400">
        <span>Janai Associates</span>
        <span className="mx-2">•</span>
       <a href="/about"><span className="text-green-600 font-medium">Contact Us</span></a> 
      </div>
      </div>
   );
}

export default Banner;