import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import bgImage from "../../assets/images/landscape_bg.jpg";
import { useAuth } from "../../hooks/useAuth";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? "login" : "signup";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, payload);

      if (res.data.success) {
        if (isLogin) {
          // Use global auth context to set login state
          login(res.data.jwtToken, res.data.role || "user", res.data.name, res.data.email);
          toast.success(res.data.message);
          
          // Redirect based on role
          setTimeout(() => {
            if (res.data.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          }, 1000);
        } else {
          toast.success("Signup successful! Please login.");
          setIsLogin(true);
          setFormData({ name: "", email: "", password: "" });
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* AUTH CARD */}
      <div className="relative grid md:grid-cols-2 w-full max-w-5xl bg-white/95 backdrop-blur-lg rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">

        {/* LEFT BRANDING */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white p-12">
          <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
            GreenLandScape 🌿
          </h1>
          <p className="text-center text-green-100 max-w-sm">
            Nurturing nature with premium landscaping & nursery solutions.
          </p>
          <div className="mt-8 w-32 h-1 bg-green-300 rounded-full" />
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-green-900 mb-2">
            {isLogin ? (isAdmin ? "🔐 Admin Login" : "Welcome Back") : "Create Your Account"}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {isLogin
              ? isAdmin ? "Access admin dashboard and manage your platform" : "Login to manage your services and projects"
              : "Join us and grow your green business"}
          </p>

          {/* Admin Toggle */}
          {isLogin && (
            <div className="mb-6 flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <input
                type="checkbox"
                id="admin-toggle"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor="admin-toggle" className="cursor-pointer text-sm font-medium text-gray-700">
                🔐 Admin Login
              </label>
            </div>
          )}

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition font-medium"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {isLogin && (
              <div className="text-right text-sm">
                <a href="#" className="text-green-700 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isLogin ? "Logging in..." : "Creating account..."}
                </>
              ) : (
                <>{isLogin ? "Login" : "Sign Up"}</>
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-600">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-green-700 font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
