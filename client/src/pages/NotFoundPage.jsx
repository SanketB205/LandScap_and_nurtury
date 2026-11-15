import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft, Leaf } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col items-center justify-center px-4 py-16">
      {/* Decorative leaf */}
      <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-100 shadow-inner">
        <Leaf className="w-10 h-10 text-green-600" />
      </div>

      {/* 404 number */}
      <h1 className="text-8xl font-black text-green-700 tracking-tight select-none leading-none">
        404
      </h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl font-bold text-gray-800 text-center">
        Page Not Found
      </h2>
      <p className="mt-3 text-gray-500 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Let&apos;s get you back to solid ground.
      </p>

      {/* Quick links */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-xl shadow-md hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Home className="w-4 h-4" />
          Go to Homepage
        </Link>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-semibold rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Search className="w-4 h-4" />
          Browse Services
        </Link>
      </div>

      {/* Back link */}
      <button
        onClick={() => window.history.back()}
        className="mt-5 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-green-600 transition-colors"
        type="button"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </button>

      {/* Need help */}
      <p className="mt-10 text-sm text-gray-400">
        Need help?{" "}
        <Link
          to="/contact"
          className="text-green-600 hover:underline font-medium"
        >
          Contact our Pune team
        </Link>
      </p>
    </div>
  );
}
