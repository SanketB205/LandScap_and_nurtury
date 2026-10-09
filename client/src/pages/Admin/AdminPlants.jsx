import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Sprout,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function AdminPlants() {
  const { success, error } = useToast();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState(null);

  const [form, setForm] = useState({
    name: "",
    botanicalName: "",
    category: "indoor",
    description: "",
    careInstructions: "",
    sunlight: "Full Sun",
    watering: "Moderate",
    space: "Medium",
    price: 250,
    stockQuantity: 25,
    inStock: true,
    images: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
  });

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const res = await api.get("/plants?status=active");
      if (res.data.success) {
        setPlants(res.data.data);
      }
    } catch (err) {
      error("Failed to load plants.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingPlant(null);
    setForm({
      name: "",
      botanicalName: "",
      category: "indoor",
      description: "",
      careInstructions: "",
      sunlight: "Full Sun",
      watering: "Moderate",
      space: "Medium",
      price: 250,
      stockQuantity: 25,
      inStock: true,
      images: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (plant) => {
    setEditingPlant(plant);
    setForm({
      name: plant.name,
      botanicalName: plant.botanicalName || "",
      category: plant.category,
      description: plant.description,
      careInstructions: plant.careInstructions || "",
      sunlight: plant.sunlight || "Full Sun",
      watering: plant.watering || "Moderate",
      space: plant.space || "Medium",
      price: plant.price,
      stockQuantity: plant.stockQuantity,
      inStock: plant.inStock,
      images: plant.images?.[0] || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        images: [form.images],
      };

      if (editingPlant) {
        await api.put(`/plants/${editingPlant._id}`, payload);
        success("Plant updated successfully.");
      } else {
        await api.post("/plants", payload);
        success("Plant listing created.");
      }
      setModalOpen(false);
      fetchPlants();
    } catch (err) {
      error(err.message || "Failed to save plant.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this plant listing?")) return;
    try {
      await api.delete(`/plants/${id}`);
      success("Plant listing deleted.");
      fetchPlants();
    } catch (err) {
      error("Failed to delete plant.");
    }
  };

  const filteredPlants = plants.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.botanicalName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-gray-900">
            Nursery Plant Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Maintain stock quantities, prices, categories, and horticultural care directions.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Plant</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-2">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Filter by common or botanical plant name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs outline-none"
        />
      </div>

      {/* Plants Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-semibold">Loading plant catalog...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Plant</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Sunlight / Water</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Inventory</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPlants.map((plant) => (
                  <tr key={plant._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={plant.images[0]}
                          alt={plant.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <strong className="text-gray-900 block font-semibold">{plant.name}</strong>
                          <span className="text-[11px] text-gray-400 italic">
                            {plant.botanicalName || "Native"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize font-semibold">{plant.category}</td>
                    <td className="py-3 px-4">
                      <span className="block">{plant.sunlight}</span>
                      <span className="text-[11px] text-gray-400">{plant.watering} water</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-green-900">₹{plant.price}</td>
                    <td className="py-3 px-4">
                      {plant.stockQuantity > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          <span>{plant.stockQuantity} In Stock</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Out of Stock</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(plant)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-green-800 hover:bg-green-50 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(plant._id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-700 hover:bg-red-50 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Plant Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="text-xl font-bold font-serif text-gray-900">
                {editingPlant ? "Edit Plant Listing" : "Add New Nursery Plant"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Common Plant Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Botanical Latin Name</label>
                  <input
                    type="text"
                    value={form.botanicalName}
                    onChange={(e) => setForm({ ...form, botanicalName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  >
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="flowering">Flowering</option>
                    <option value="ornamental">Ornamental</option>
                    <option value="lawn-grass">Lawn Grass</option>
                    <option value="trees">Trees</option>
                    <option value="shrubs">Shrubs</option>
                    <option value="supplies">Gardening Supplies</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Sunlight</label>
                  <select
                    value={form.sunlight}
                    onChange={(e) => setForm({ ...form, sunlight: e.target.value })}
                    className="w-full p-2 rounded-xl border border-gray-200 outline-none"
                  >
                    <option value="Full Sun">Full Sun</option>
                    <option value="Indirect Bright">Indirect Bright</option>
                    <option value="Partial Shade">Partial Shade</option>
                    <option value="Low Light">Low Light</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Watering</label>
                  <select
                    value={form.watering}
                    onChange={(e) => setForm({ ...form, watering: e.target.value })}
                    className="w-full p-2 rounded-xl border border-gray-200 outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={form.stockQuantity}
                    onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={form.images}
                  onChange={(e) => setForm({ ...form, images: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Horticultural Care Guide</label>
                <textarea
                  rows="2"
                  value={form.careInstructions}
                  onChange={(e) => setForm({ ...form, careInstructions: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold"
                >
                  Save Plant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
