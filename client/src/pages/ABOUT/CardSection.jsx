function CardSection() {
  return (
    <>
      <section className="w-full bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 bg-white p-6 shadow-md rounded-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-lime-500 text-white">
                <i className="fa-solid fa-square-check"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">870+</h2>
                <p className="text-sm text-gray-500">Gardens Designed</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-6 shadow-md rounded-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-lime-500 text-white">
                <i className="fa-solid fa-message"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">110%</h2>
                <p className="text-sm text-gray-500">Satisfied Clients</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-6 shadow-md rounded-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-lime-500 text-white">
                <i className="fa-brands fa-canadian-maple-leaf"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">4,820 m2</h2>
                <p className="text-sm text-gray-500">Turf Laid</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-6 shadow-md rounded-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-lime-500 text-white">
                <i className="fa-solid fa-people-carry-box"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">25+</h2>
                <p className="text-sm text-gray-500">Landscapers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CardSection;