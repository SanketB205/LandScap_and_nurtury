import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Shield, User as UserIcon, Mail, Phone, Calendar } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      // If endpoint doesn't exist, show demo data
      setUsers([
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "+91-98765-43210",
          role: "user",
          createdAt: new Date(),
        },
      ]);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete user");
      }
    }
  };

  const makeAdmin = async (id) => {
    if (window.confirm("Make this user an admin?")) {
      try {
        await axios.patch(`http://localhost:5000/api/users/${id}/make-admin`);
        toast.success("User promoted to admin");
        fetchUsers();
      } catch (err) {
        console.error(err);
        toast.error("Failed to update user role");
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">👥 Manage Users</h1>
          <p className="text-gray-600">View and manage registered users</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{users.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-gray-500 text-sm">Regular Users</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {users.filter((u) => u.role !== "admin").length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <p className="text-gray-500 text-sm">Admins</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {users.filter((u) => u.role === "admin").length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Users Table */}
        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <UserIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">
              {search ? "No users found matching your search" : "No users registered yet"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://i.pravatar.cc/40?u=${user.email}`}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="font-medium text-gray-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${user.email}`}
                          className="text-blue-600 hover:underline flex items-center gap-2"
                        >
                          <Mail size={16} />
                          {user.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        {user.phone ? (
                          <a
                            href={`tel:${user.phone}`}
                            className="text-blue-600 hover:underline flex items-center gap-2"
                          >
                            <Phone size={16} />
                            {user.phone}
                          </a>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.role === "admin" ? (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit">
                            <Shield size={14} /> Admin
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            User
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3 justify-center">
                          {user.role !== "admin" && (
                            <button
                              onClick={() => makeAdmin(user._id)}
                              className="text-purple-600 hover:bg-purple-50 p-2 rounded transition"
                              title="Make Admin"
                            >
                              <Shield size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
