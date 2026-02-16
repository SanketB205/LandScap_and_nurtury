import { ShoppingCart, Heart, Search } from "lucide-react";
import { productsData } from "../data/productsData";

const ProductsPage = () => {
    return (
        <div className="bg-[#f8faf7] min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-extrabold text-green-900 leading-tight">
                            Our <span className="text-lime-600 underline decoration-lime-200 decoration-8 underline-offset-4">Premium</span> Products
                        </h1>
                        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                            Enhance your green space with our curated selection of high-quality plants, tools, and garden essentials. Everything you need for a thriving nursery.
                        </p>
                    </div>

                    {/* Search/Filter Bar Placeholder */}
                    <div className="relative w-full md:w-80 group">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent shadow-sm transition-all group-hover:shadow-md"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-600 transition-colors" size={20} />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                    {productsData.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group flex flex-col border border-gray-100 hover:border-lime-100"
                        >
                            {/* Image Container */}
                            <div className="h-72 overflow-hidden relative">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="h-full w-full object-cover group-hover:scale-110 transition duration-1000 ease-out"
                                />

                                {/* Overlay Badges */}
                                <div className="absolute top-6 left-6 flex flex-col gap-2 translate-x-[-20%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                    <button className="bg-white p-3 rounded-xl shadow-lg hover:bg-lime-500 hover:text-white transition-colors">
                                        <Heart size={20} />
                                    </button>
                                </div>

                                <div className="absolute top-6 right-6">
                                    <span className="bg-green-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-2xl font-bold text-green-900 hover:text-lime-600 transition-colors cursor-pointer leading-tight">
                                        {product.name}
                                    </h3>
                                </div>

                                <p className="text-gray-500 text-base leading-relaxed mb-6 line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-400 font-medium line-through">₹{Math.round(product.price * 1.2)}</span>
                                        <span className="text-3xl font-black text-green-800 tracking-tight">
                                            ₹{product.price}
                                        </span>
                                    </div>

                                    <button className="bg-green-800 text-white p-4 rounded-2xl hover:bg-green-700 active:scale-95 transition-all shadow-lg shadow-green-900/10 flex items-center gap-2 font-bold px-6">
                                        <ShoppingCart size={20} />
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter/CTA */}
                <div className="mt-20 bg-green-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-lime-400 rounded-full blur-[100px]"></div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-400 rounded-full blur-[100px]"></div>
                    </div>
                    <h2 className="text-4xl font-black mb-4 relative z-10">Can't find what you're looking for?</h2>
                    <p className="text-green-100 mb-8 max-w-xl mx-auto relative z-10 text-lg">
                        We source custom plants and tools for landscape projects. Contact our experts for special orders.
                    </p>
                    <button className="bg-lime-500 hover:bg-lime-400 text-green-950 font-black px-10 py-4 rounded-2xl transition-all shadow-xl relative z-10 text-lg">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
