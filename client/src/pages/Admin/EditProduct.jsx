import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Save, ArrowLeft } from "lucide-react";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        img: "",
        description: "",
    });

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
            setFormData({ ...data });
        } catch (err) {
            console.error(err);
            toast.error("Failed to load product details.");
        } finally {
            setInitialLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`http://localhost:5000/api/products/${id}`, formData);
            toast.success("Product updated successfully!");
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update product.");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nature-700"></div>
            </div>
        );
    }

    return (
        <div className="p-10 max-w-4xl mx-auto flex-1">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate("/admin/products")}
                    className="p-3 bg-white rounded-xl shadow hover:bg-nature-50 text-nature-700 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-4xl font-brand font-bold text-nature-900">
                    Edit Product
                </h1>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-nature-900/5 p-10 border border-nature-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-nature-700 uppercase tracking-wider">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border-2 border-nature-100 bg-nature-50 rounded-xl p-4 focus:ring-0 focus:border-nature-500 font-medium text-nature-900 transition-colors"
                                placeholder="Product Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-nature-700 uppercase tracking-wider">
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full border-2 border-nature-100 bg-nature-50 rounded-xl p-4 focus:ring-0 focus:border-nature-500 font-medium text-nature-900 transition-colors"
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-nature-700 uppercase tracking-wider">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full border-2 border-nature-100 bg-nature-50 rounded-xl p-4 focus:ring-0 focus:border-nature-500 font-medium text-nature-900 transition-colors"
                                placeholder="e.g., Indoor Plants"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-nature-700 uppercase tracking-wider">
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="img"
                                value={formData.img}
                                onChange={handleChange}
                                required
                                className="w-full border-2 border-nature-100 bg-nature-50 rounded-xl p-4 focus:ring-0 focus:border-nature-500 font-medium text-nature-900 transition-colors"
                                placeholder="https://images.unsplash..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2 flex gap-6">
                        <img src={formData.img} className="w-24 h-24 object-cover rounded-xl border border-nature-200" alt="Preview" />
                        <div className="flex-1">
                            <label className="text-sm font-bold text-nature-700 uppercase tracking-wider mb-2 block">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                required
                                className="w-full border-2 border-nature-100 bg-nature-50 rounded-xl p-4 focus:ring-0 focus:border-nature-500 font-medium text-nature-900 transition-colors resize-none"
                                placeholder="Enter product description..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-nature-700 hover:bg-nature-800 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg flex items-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Save size={20} />
                            )}
                            {loading ? "Updating..." : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
