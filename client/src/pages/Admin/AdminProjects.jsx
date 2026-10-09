import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Image,
  MapPin,
  Sparkles,
} from "lucide-react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function AdminProjects() {
  const { success, error } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [form, setForm] = useState({
    title: "",
    location: "Pune, Maharashtra",
    category: "Residential",
    description: "",
    clientName: "Private Client",
    area: "1,200 sq ft",
    beforeImage: "",
    afterImage: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects?status=published");
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setForm({
      title: "",
      location: "Pune, Maharashtra",
      category: "Residential",
      description: "",
      clientName: "Private Client",
      area: "1,200 sq ft",
      beforeImage: "",
      afterImage: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      location: project.location,
      category: project.category,
      description: project.description,
      clientName: project.clientName || "Private Client",
      area: project.area || "",
      beforeImage: project.beforeImage || "",
      afterImage: project.afterImage,
      isFeatured: project.isFeatured || false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, form);
        success("Project updated successfully.");
      } else {
        await api.post("/projects", form);
        success("Project portfolio entry added.");
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      error(err.message || "Failed to save project.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this project entry?")) return;
    try {
      await api.delete(`/projects/${id}`);
      success("Project deleted successfully.");
      fetchProjects();
    } catch (err) {
      error("Failed to delete project.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-gray-900">
            Portfolio Project Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Showcase completed transformations with Before/After imagery across Pune.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-semibold">Loading projects...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Area</th>
                  <th className="py-3 px-4">Before / After</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.afterImage}
                          alt={project.title}
                          className="w-12 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <strong className="text-gray-900 block font-semibold">{project.title}</strong>
                          <span className="text-[11px] text-gray-400">{project.clientName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">{project.category}</td>
                    <td className="py-3 px-4">{project.location}</td>
                    <td className="py-3 px-4">{project.area || "—"}</td>
                    <td className="py-3 px-4">
                      {project.beforeImage ? (
                        <span className="inline-block bg-lime-100 text-green-900 font-bold text-[10px] px-2 py-0.5 rounded-full">
                          Both Available
                        </span>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                          After Only
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-green-800 hover:bg-green-50 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
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

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="text-xl font-bold font-serif text-gray-900">
                {editingProject ? "Edit Project" : "Add Completed Project"}
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
                  <label className="block font-bold text-gray-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Sports Turf">Sports Turf</option>
                    <option value="Terrace Garden">Terrace Garden</option>
                    <option value="Farmhouse">Farmhouse</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Pune Location</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Area / Dimensions</label>
                  <input
                    type="text"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">After Image URL (Required)</label>
                  <input
                    type="url"
                    required
                    value={form.afterImage}
                    onChange={(e) => setForm({ ...form, afterImage: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Before Image URL (Optional)</label>
                  <input
                    type="url"
                    value={form.beforeImage}
                    onChange={(e) => setForm({ ...form, beforeImage: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Project Description</label>
                <textarea
                  rows="3"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-green-700"
                />
                <label htmlFor="featured" className="font-bold text-gray-700 cursor-pointer">
                  Feature on Homepage Portfolio
                </label>
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
