import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Save, LogOut, Key, Bell, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AdminSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    appName: "Greenland Nursery",
    email: "admin@greenlandnursery.com",
    phone: "+91-98765-43210",
    address: "123 Green Street, Garden City",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSettingsChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Here you would typically send this to your backend
      localStorage.setItem("appSettings", JSON.stringify(settings));
      toast.success("Settings saved successfully!");
      setLoading(false);
    } catch (err) {
      toast.error("Failed to save settings");
      setLoading(false);
    }
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
      setLoading(false);
    } catch (err) {
      toast.error("Failed to change password");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      navigate("/admin/login");
      toast.success("Logged out successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">⚙️ Admin Settings</h1>
          <p className="text-gray-600">Manage your application settings and preferences</p>
        </div>

        {/* Settings Tabs */}
        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center gap-3">
              <SettingsIcon className="text-white" size={24} />
              <h2 className="text-xl font-bold text-white">General Settings</h2>
            </div>

            <form onSubmit={saveSettings} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Name
                  </label>
                  <input
                    type="text"
                    name="appName"
                    value={settings.appName}
                    onChange={handleSettingsChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleSettingsChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={settings.phone}
                    onChange={handleSettingsChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={settings.address}
                    onChange={handleSettingsChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? "Saving..." : "Save Settings"}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center gap-3">
              <Key className="text-white" size={24} />
              <h2 className="text-xl font-bold text-white">Change Password</h2>
            </div>

            <form onSubmit={changePassword} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={password.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                <Key size={20} />
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>

          {/* Notifications Settings */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center gap-3">
              <Bell className="text-white" size={24} />
              <h2 className="text-xl font-bold text-white">Notification Settings</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive email for new messages</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Contact Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified about new contact inquiries</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Service Updates</h3>
                  <p className="text-sm text-gray-600">Notifications when services are viewed</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center gap-3">
              <Shield className="text-white" size={24} />
              <h2 className="text-xl font-bold text-white">Security & Session</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Danger Zone:</strong> The actions below cannot be undone
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
              >
                <LogOut size={20} />
                Logout
              </button>

              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition">
                Clear Session Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
