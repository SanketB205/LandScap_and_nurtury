import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Phone, Loader2, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const { register, loading, isAuthenticated } = useAuth()
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
    const result = await register(formData)
    if (!result.success) {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-nature-50 px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-nature-100">
        <div className="bg-nature-700 p-8 text-white text-center">
          <h1 className="text-3xl font-serif mb-2">Join GreenScape</h1>
          <p className="text-nature-100 mb-0">Create an account to start your green journey</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-nature-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nature-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-nature-50 border border-nature-100 rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-nature-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nature-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-nature-50 border border-nature-100 rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-nature-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nature-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-nature-50 border border-nature-100 rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-nature-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nature-400" />
                <input
                  type="password"
                  name="password"
                  required
                  minLength="6"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-nature-50 border border-nature-100 rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 outline-none transition-all"
                  placeholder="Min. 6 characters"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                id="register-submit"
                type="submit"
                disabled={loading}
                className="w-full bg-nature-700 hover:bg-nature-800 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Create Account <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-nature-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" title="Login" className="text-nature-700 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
