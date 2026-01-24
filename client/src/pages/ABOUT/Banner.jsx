import bgImage from "../../assets/images/landscape_bg.jpg"
import Hero from "./Hero";
function Banner() {
    return (
    <div className="w-full text-gray-700 font-sans">
      <div
        className="bg-gray-100 bg-cover bg-center text-center py-20 px-4"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3">
          About Us
        </h1>
        <p className="text-gray-500 text-base md:text-lg">
          The Janai landscaper has been in business since 2018
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-5 text-sm text-gray-400">
        <span>Janai Associates</span>
        <span className="mx-2">•</span>
       <a href="/about"><span className="text-green-600 font-medium">About Us</span></a> 
      </div>
      </div>
   );
}

export default Banner;