import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Plus, Edit, Trash2 } from "lucide-react";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch products");
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            toast.success("Product deleted successfully");
            fetchProducts();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete product");
        }
    };

    return (
        <div className="p-10 max-w-7xl mx-auto flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-brand font-bold text-nature-900">
                        Manage Products
                    </h1>
                    <p className="text-nature-600 mt-2">Manage your inventory and product listings.</p>
                </div>

                <Link
                    to="/admin/products/add"
                    className="bg-nature-700 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-nature-800 transition-colors flex items-center gap-2 font-semibold"
                >
                    <Plus size={20} /> Add Product
                </Link>
            </div>

            {/* Content */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-nature-900/5 p-8 border border-nature-100">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nature-700"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 text-nature-600 flex flex-col items-center">
                        <i className="fa-solid fa-box-open text-6xl mb-4 text-nature-300"></i>
                        <p className="text-xl font-medium">No products found. Start by adding a new one!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-nature-100">
                                    <th className="p-4 text-nature-500 font-semibold tracking-wide uppercase text-sm">Product Name</th>
                                    <th className="p-4 text-nature-500 font-semibold tracking-wide uppercase text-sm">Category</th>
                                    <th className="p-4 text-nature-500 font-semibold tracking-wide uppercase text-sm">Price</th>
                                    <th className="p-4 text-nature-500 font-semibold tracking-wide uppercase text-sm text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((p) => (
                                    <tr
                                        key={p._id}
                                        className="border-b border-nature-50 hover:bg-nature-50/50 transition-colors group"
                                    >
                                        <td className="p-4 flex items-center gap-4">
                                            <img src={p.img} alt={p.name} className="w-12 h-12 rounded-lg object-cover border border-nature-200" />
                                            <span className="font-semibold text-nature-900 group-hover:text-nature-600 transition-colors">
                                                {p.name}
                                            </span>
                                        </td>

                                        <td className="p-4 text-nature-600">
                                            <span className="bg-nature-100 text-nature-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {p.category}
                                            </span>
                                        </td>

                                        <td className="p-4 font-bold text-nature-800">
                                            ₹{p.price}
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <Link
                                                    to={`/admin/products/edit/${p._id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={20} />
                                                </Link>

                                                <button
                                                    onClick={() => deleteProduct(p._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts;
