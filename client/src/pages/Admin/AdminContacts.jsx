import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Mail, Phone, MessageSquare } from "lucide-react";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contactus");
      setContacts(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch contacts");
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`http://localhost:5000/api/contactus/${id}`);
        toast.success("Message deleted successfully");
        fetchContacts();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete message");
      }
    }
  };

  const handleReply = (email) => {
    window.location.href = `mailto:${email}?subject=Re: Your message from Greenland Nursery`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📧 Contact Messages</h1>
          <p className="text-gray-600">Manage customer inquiries and messages</p>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "all"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            All Messages ({contacts.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "unread"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Unread ({contacts.filter(c => !c.read).length})
          </button>
        </div>

        {/* Messages List */}
        {contacts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">No contact messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-l-4 border-green-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-gray-800">{contact.name}</h3>
                      {!contact.read && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} />
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} />
                        <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(contact.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="bg-gray-50 rounded p-4 my-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                </div>

                {/* Subject if exists */}
                {contact.subject && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-600">
                      <strong>Subject:</strong> {contact.subject}
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => handleReply(contact.email)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-medium flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;
