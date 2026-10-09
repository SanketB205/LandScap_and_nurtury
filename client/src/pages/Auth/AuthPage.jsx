import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, User, Phone, ArrowRight, ShieldCheck, Leaf } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const user = await login(formData.email, formData.password);
        success(`Welcome back, ${user.name}!`);
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        const user = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });
        success(`Account created successfully! Welcome, ${user.name}`);
        navigate("/");
      }
    } catch (err) {
      error(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#142d20] py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Graphic Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1920&q=80')",
        }}
      />

      <div className="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-white/20">
        {/* Left Side: Brand Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#1b4332] to-[#0d2818] p-8 sm:p-10 text-white flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-lime-400 text-green-950 flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-lg font-black font-serif">Janai Landscape</span>
            </div>

            <h2 className="text-2xl font-black font-serif pt-4 leading-tight">
              Customer & Staff Portal
            </h2>
            <p className="text-xs text-green-200 leading-relaxed">
              Log in to track your landscaping project inquiries, review digital proposals,
              and manage plant care orders.
            </p>
          </div>

          <div className="pt-8 border-t border-green-800 text-xs text-green-300 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>Secure JWT Session Protection</span>
            </div>
            <p className="text-[11px] text-green-400">
              Admin credentials provided during deployment:
              <br />
              <code className="text-white bg-black/30 px-1 py-0.5 rounded">
                admin@janailandscape.com
              </code>
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-7 p-8 sm:p-10 space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 pb-3">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 text-center py-2 text-xs font-bold transition ${
                isLogin
                  ? "text-green-800 border-b-2 border-green-700"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 text-center py-2 text-xs font-bold transition ${
                !isLogin
                  ? "text-green-800 border-b-2 border-green-700"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Create Account
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {isLogin ? "Welcome Back" : "Join Janai Landscape Services"}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {isLogin
                ? "Sign in with your email and password"
                : "Register for faster inquiry tracking"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rahul Deshmukh"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. +91 98220 12345"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-extrabold py-3.5 rounded-xl transition text-xs shadow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : isLogin ? "Sign In" : "Create Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-500">
            {isLogin ? "Don’t have an account yet?" : "Already registered?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-700 font-bold hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
