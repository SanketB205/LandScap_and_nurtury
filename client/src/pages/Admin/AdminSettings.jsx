import { useState } from "react";
import { Save, Key, Lock } from "lucide-react";
import { toast } from "react-toastify";
import AdminLayout from "../../components/AdminLayout";

const AdminSettings = () => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (password.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      // Here you would typically send this to your backend
      toast.success("Password changed successfully!");
      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Settings" description="Manage your account settings and preferences">
      <div className="max-w-2xl">
        {/* Change Password */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Key size={24} className="text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
          </div>

          <form onSubmit={changePassword} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Current Password</label>
              <input
                type="password"
                name="oldPassword"
                value={password.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Must be at least 6 characters</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save size={20} /> {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>

        {/* Security Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Lock size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Security Info</h3>
          </div>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>✓ Use a strong password with at least 6 characters</li>
            <li>✓ Change your password regularly for better security</li>
            <li>✓ Never share your password with anyone</li>
            <li>✓ Your account is protected with JWT authentication</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
