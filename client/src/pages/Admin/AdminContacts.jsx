import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Mail, Phone, MessageSquare } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <AdminLayout title="Contact Messages" description="Manage customer inquiries and messages">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
            <p className="mt-4 text-gray-600">Loading messages...</p>
          </div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">No contact messages yet</p>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <p className="text-gray-700 font-medium">Total Messages: <span className="text-2xl text-green-600">{contacts.length}</span></p>
          </div>

          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-l-4 border-green-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-800">{contact.name}</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail size={16} className="text-blue-600" />
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone size={16} className="text-blue-600" />
                        <a href={`tel:${contact.phoneno}`} className="text-blue-600 hover:underline">
                          {contact.phoneno}
                        </a>
                      </div>
                      {contact.service && (
                        <div className="text-sm text-gray-600">
                          <strong>Service:</strong> {contact.service}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 mt-4 bg-gray-50 p-4 rounded">{contact.message}</p>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleReply(contact.email)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContacts;
