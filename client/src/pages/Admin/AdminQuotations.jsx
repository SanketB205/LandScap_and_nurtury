import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Printer,
  CheckCircle,
  Eye,
  X,
  Sparkles,
} from "lucide-react";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function AdminQuotations() {
  const { success, error } = useToast();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewQuotation, setViewQuotation] = useState(null);

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [projectTitle, setProjectTitle] = useState("Villa Landscape & Carpet Turf Installation");
  const [items, setItems] = useState([
    { description: "Selection One Natural Carpet Turf Supply & Installation", quantity: 600, unit: "sq ft", unitPrice: 35 },
    { description: "Enriched Red Soil & Vermicompost Site Preparation", quantity: 600, unit: "sq ft", unitPrice: 12 },
    { description: "Automated Micro-Drip Irrigation Network", quantity: 600, unit: "sq ft", unitPrice: 18 },
  ]);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const res = await api.get("/quotations");
      if (res.data.success) {
        setQuotations(res.data.data);
      }
    } catch (err) {
      error("Failed to load quotations.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setItems([...items, { description: "", quantity: 1, unit: "sq ft", unitPrice: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const subtotal = items.reduce(
    (acc, curr) => acc + (Number(curr.quantity) || 0) * (Number(curr.unitPrice) || 0),
    0
  );
  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;

  const handleCreateQuotation = async (e) => {
    e.preventDefault();
    if (!customerName || items.length === 0) {
      error("Please fill in customer name and add at least one line item.");
      return;
    }

    try {
      const res = await api.post("/quotations", {
        customerName,
        customerEmail,
        customerPhone,
        projectTitle,
        items,
        gstPercent: 18,
      });

      if (res.data.success) {
        success("Quotation generated successfully!");
        setModalOpen(false);
        fetchQuotations();
      }
    } catch (err) {
      error(err.message || "Failed to create quotation.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-gray-900">
            Digital Quotations & Proposals
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Generate formal itemized proposals with GST calculations for Pune clients.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Quotation</span>
        </button>
      </div>

      {/* Quotations List Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-semibold">Loading quotations...</p>
        </div>
      ) : quotations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl p-8 border border-gray-200">
          <p className="text-gray-500 text-sm">No quotations issued yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Quote Number</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Project Title</th>
                  <th className="py-3 px-4">Grand Total (incl. GST)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">View / Print</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotations.map((q) => (
                  <tr key={q._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-green-800">
                      {q.quoteNumber}
                    </td>
                    <td className="py-3 px-4">
                      <strong className="text-gray-900 block font-semibold">{q.customerName}</strong>
                      <span className="text-[11px] text-gray-400">{q.customerPhone}</span>
                    </td>
                    <td className="py-3 px-4 max-w-[200px] truncate">{q.projectTitle}</td>
                    <td className="py-3 px-4 font-bold text-gray-900">
                      ₹{q.grandTotal.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setViewQuotation(q)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-lg transition text-xs"
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Generator Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="text-xl font-bold font-serif text-gray-900">
                Generate Digital Quotation
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateQuotation} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              {/* Line Items */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-gray-800">Itemized Work & Materials</label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-green-700 font-bold hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                </div>

                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded-xl border">
                    <input
                      type="text"
                      placeholder="Item Description"
                      required
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                      className="flex-1 p-2 bg-white rounded-lg border text-xs outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, "quantity", Number(e.target.value))}
                      className="w-16 p-2 bg-white rounded-lg border text-xs outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      value={item.unit}
                      onChange={(e) => handleItemChange(idx, "unit", e.target.value)}
                      className="w-16 p-2 bg-white rounded-lg border text-xs outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Rate ₹"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(idx, "unitPrice", Number(e.target.value))}
                      className="w-20 p-2 bg-white rounded-lg border text-xs outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Financial Calculation Box */}
              <div className="bg-[#f6fff3] p-4 rounded-2xl border border-green-100 space-y-1.5 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (18%):</span>
                  <strong>₹{gstAmount.toLocaleString("en-IN")}</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-green-200 text-sm font-black text-green-950">
                  <span>Grand Total:</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
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
                  Issue Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview / Print Modal */}
      {viewQuotation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in print:p-0 print:bg-white">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto print:shadow-none print:max-h-full print:p-4">
            <button
              onClick={() => setViewQuotation(null)}
              className="absolute top-5 right-5 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 print:hidden"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Branded Header */}
            <div className="flex justify-between items-start pb-6 border-b border-gray-200">
              <div>
                <span className="text-xl font-black font-serif text-green-950 block">
                  Janai Landscape Services
                </span>
                <span className="text-xs text-green-700 font-bold uppercase tracking-wider block">
                  Pune, Maharashtra • Quotation
                </span>
                <p className="text-[11px] text-gray-500 mt-1">
                  Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune 411045
                  <br />
                  Phone: +91 97676 71968 | Email: contact@janailandscape.com
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase block">Quote Ref</span>
                <span className="text-sm font-mono font-bold text-green-900 block">
                  {viewQuotation.quoteNumber}
                </span>
                <span className="text-[11px] text-gray-400">
                  Date: {new Date(viewQuotation.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            </div>

            {/* Client Info */}
            <div className="bg-gray-50 p-4 rounded-2xl text-xs space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Issued To:
              </span>
              <strong className="text-sm text-gray-900 block">{viewQuotation.customerName}</strong>
              <p className="text-gray-600">📞 {viewQuotation.customerPhone}</p>
              <p className="text-gray-600">✉️ {viewQuotation.customerEmail}</p>
              <p className="text-green-800 font-bold pt-1">Project: {viewQuotation.projectTitle}</p>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-left text-xs border">
              <thead className="bg-gray-100 font-bold">
                <tr>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border text-center">Qty</th>
                  <th className="p-2 border text-center">Unit</th>
                  <th className="p-2 border text-right">Rate</th>
                  <th className="p-2 border text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {viewQuotation.items?.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2 border">{item.description}</td>
                    <td className="p-2 border text-center">{item.quantity}</td>
                    <td className="p-2 border text-center">{item.unit}</td>
                    <td className="p-2 border text-right">₹{item.unitPrice}</td>
                    <td className="p-2 border text-right font-bold">₹{item.total.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="space-y-1 text-xs text-right">
              <p>Subtotal: <strong>₹{viewQuotation.subtotal?.toLocaleString("en-IN")}</strong></p>
              <p>GST ({viewQuotation.gstPercent}%): <strong>₹{viewQuotation.gstAmount?.toLocaleString("en-IN")}</strong></p>
              <p className="text-base font-black text-green-950 pt-1 border-t">
                Grand Total: ₹{viewQuotation.grandTotal?.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Terms */}
            <div className="text-[10px] text-gray-500 space-y-1 border-t pt-3">
              <strong className="text-gray-700 block">Terms & Conditions:</strong>
              <ul className="list-disc pl-4 space-y-0.5">
                {viewQuotation.terms?.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t print:hidden">
              <button
                onClick={handlePrint}
                className="bg-green-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Print Quotation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
