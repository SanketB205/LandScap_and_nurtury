import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const { login, loading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/account')
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(formData)
    if (!result.success) {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-nature-50 px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-nature-100">
        <div className="bg-nature-700 p-8 text-white text-center">
          <h1 className="text-3xl font-serif mb-2">Welcome Back</h1>
          <p className="text-nature-100 mb-0">Login to your GreenScape account</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-nature-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nature-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-nature-50 border border-nature-100 rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-nature-700">Password</label>
                <Link to="/forgot-password" title="Forgot Password" className="text-sm text-nature-600 hover:text-nature-800 font-medium">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nature-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-nature-50 border border-nature-100 rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-nature-700 hover:bg-nature-800 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-nature-600 text-sm">
            Don't have an account?{' '}
            <Link to="/register" title="Register" className="text-nature-700 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
