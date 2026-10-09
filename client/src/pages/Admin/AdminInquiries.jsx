import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  Trash2,
  X,
  FileText,
  User,
  Plus,
} from "lucide-react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function AdminInquiries() {
  const { success, error } = useToast();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [activeInquiry, setActiveInquiry] = useState(null);

  // Status update state
  const [newStatus, setNewStatus] = useState("");
  const [statusNote, setStatusNote] = useState("");

  // Internal note state
  const [internalNote, setInternalNote] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, [selectedStatus]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      let query = "/inquiries?";
      if (selectedStatus !== "all") query += `status=${selectedStatus}&`;
      if (search) query += `search=${encodeURIComponent(search)}&`;

      const res = await api.get(query);
      if (res.data.success) {
        setInquiries(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
      error("Could not fetch customer leads.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleStatusUpdate = async () => {
    if (!activeInquiry || !newStatus) return;
    try {
      const res = await api.patch(`/inquiries/${activeInquiry._id}/status`, {
        status: newStatus,
        note: statusNote,
      });
      if (res.data.success) {
        success(`Inquiry marked as ${newStatus}`);
        setActiveInquiry(res.data.data);
        setStatusNote("");
        fetchInquiries();
      }
    } catch (err) {
      error(err.message || "Failed to update status.");
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!activeInquiry || !internalNote.trim()) return;

    try {
      const res = await api.patch(`/inquiries/${activeInquiry._id}/notes`, {
        note: internalNote,
      });
      if (res.data.success) {
        success("Internal staff note saved.");
        setActiveInquiry(res.data.data);
        setInternalNote("");
        fetchInquiries();
      }
    } catch (err) {
      error(err.message || "Failed to add internal note.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this inquiry record?")) {
      return;
    }

    try {
      const res = await api.delete(`/inquiries/${id}`);
      if (res.data.success) {
        success("Inquiry deleted successfully.");
        setActiveInquiry(null);
        fetchInquiries();
      }
    } catch (err) {
      error(err.message || "Failed to delete record.");
    }
  };

  const statuses = [
    { label: "All Leads", value: "all" },
    { label: "New", value: "New" },
    { label: "Contacted", value: "Contacted" },
    { label: "Quotation Sent", value: "Quotation Sent" },
    { label: "Approved", value: "Approved" },
    { label: "Completed", value: "Completed" },
    { label: "Rejected", value: "Rejected" },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black font-serif text-gray-900">
          Inquiries & Customer Leads
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Review customer quotation requests, update status history, and append internal notes.
        </p>
      </div>

      {/* Search & Tabs */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, email, or Ref ID (e.g. JLS-INQ-10492)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition"
          >
            Filter
          </button>
        </form>

        <div className="flex flex-wrap gap-1.5 border-t border-gray-100 pt-3">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => setSelectedStatus(s.value)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                selectedStatus === s.value
                  ? "bg-green-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-semibold">Loading inquiries...</p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl p-8 border border-gray-200">
          <p className="text-gray-500 text-sm">No inquiries match the current filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Area / Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-gray-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-green-800">
                      {inq.referenceId}
                    </td>
                    <td className="py-3 px-4 text-[11px] text-gray-400">
                      {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <strong className="text-gray-900 block font-semibold">{inq.name}</strong>
                      <span className="text-[11px] text-gray-500">{inq.phone}</span>
                    </td>
                    <td className="py-3 px-4 max-w-[180px] truncate">{inq.serviceName}</td>
                    <td className="py-3 px-4">
                      <span>{inq.areaSqFt ? `${inq.areaSqFt} sq ft` : "—"}</span>
                      <span className="block text-[11px] text-gray-400">{inq.budgetRange}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          inq.status === "New"
                            ? "bg-amber-100 text-amber-800"
                            : inq.status === "Contacted"
                            ? "bg-blue-100 text-blue-800"
                            : inq.status === "Quotation Sent"
                            ? "bg-purple-100 text-purple-800"
                            : inq.status === "Approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : inq.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setActiveInquiry(inq);
                          setNewStatus(inq.status);
                        }}
                        className="bg-green-700 hover:bg-green-800 text-white font-bold text-[11px] px-3 py-1 rounded-lg transition"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(inq._id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition"
                        title="Delete record"
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

      {/* Customer Lead Drawer / Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end animate-fade-in">
          <div className="bg-white w-full max-w-xl h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-800 bg-green-50 px-2.5 py-0.5 rounded-full">
                    {activeInquiry.type.toUpperCase()} INQUIRY
                  </span>
                  <h3 className="text-xl font-black font-serif text-gray-900 mt-1">
                    {activeInquiry.referenceId}
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Received on {new Date(activeInquiry.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <button
                  onClick={() => setActiveInquiry(null)}
                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <strong className="text-gray-900 text-sm">{activeInquiry.name}</strong>
                  <a
                    href={`https://wa.me/${activeInquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-[#25D366] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
                <p className="text-gray-600">📞 {activeInquiry.phone}</p>
                <p className="text-gray-600">✉️ {activeInquiry.email}</p>
                <p className="text-gray-600">📍 {activeInquiry.location}</p>
              </div>

              {/* Project Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-[10px] text-gray-400 block font-semibold">Service</span>
                  <strong className="text-gray-800">{activeInquiry.serviceName}</strong>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-[10px] text-gray-400 block font-semibold">Property</span>
                  <strong className="text-gray-800">{activeInquiry.propertyType}</strong>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-[10px] text-gray-400 block font-semibold">Area</span>
                  <strong className="text-gray-800">
                    {activeInquiry.areaSqFt ? `${activeInquiry.areaSqFt} Sq Ft` : "Not specified"}
                  </strong>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-[10px] text-gray-400 block font-semibold">Budget</span>
                  <strong className="text-gray-800">{activeInquiry.budgetRange}</strong>
                </div>
              </div>

              {/* Customer Message */}
              {activeInquiry.message && (
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-gray-700">Customer Message:</h4>
                  <p className="p-3 bg-green-50/50 rounded-xl border border-green-100 text-gray-700 leading-relaxed">
                    {activeInquiry.message}
                  </p>
                </div>
              )}

              {/* Status Update Control */}
              <div className="p-4 bg-gray-50 rounded-2xl border space-y-3 text-xs">
                <h4 className="font-bold text-gray-900">Update Lead Status</h4>
                <div className="flex gap-2">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="p-2 border rounded-xl bg-white flex-1 outline-none font-semibold text-gray-800"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Quotation Sent">Quotation Sent</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold px-4 py-2 rounded-xl transition"
                  >
                    Save
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Optional status transition note..."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full p-2 border rounded-xl bg-white text-xs outline-none"
                />
              </div>

              {/* Internal Staff Notes */}
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-gray-900">Internal Staff Notes</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {activeInquiry.internalNotes?.length === 0 ? (
                    <p className="text-gray-400 italic">No internal notes added yet.</p>
                  ) : (
                    activeInquiry.internalNotes?.map((n, i) => (
                      <div key={i} className="p-2.5 bg-gray-50 rounded-xl border space-y-0.5">
                        <div className="flex justify-between text-[10px] text-gray-400">
                          <strong className="text-green-800">{n.author}</strong>
                          <span>{new Date(n.date).toLocaleString("en-IN")}</span>
                        </div>
                        <p className="text-gray-700">{n.note}</p>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add an internal note..."
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    className="flex-1 p-2 border rounded-xl text-xs outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-gray-800 hover:bg-black text-white font-bold px-3 py-2 rounded-xl text-xs"
                  >
                    Post Note
                  </button>
                </form>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setActiveInquiry(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-5 py-2 rounded-xl text-xs"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
