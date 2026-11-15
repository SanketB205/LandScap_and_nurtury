import { Link } from "react-router-dom";

export default function CookiePolicy() {
  return (
    <div className="bg-[#fcfdfa] text-gray-800 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <nav className="flex flex-col sm:flex-row gap-4 text-xs text-gray-500">
          <Link to="/" className="hover:text-green-700 transition">← Home</Link>
        </nav>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              Legal
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-serif text-green-950 mt-3">
              Cookie Policy
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Last updated: October 2026
            </p>
          </div>

          <div className="space-y-5 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">1. What Are Cookies</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website.
                They help us remember your preferences, enable functionality, and analyze
                traffic.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">2. Cookies We Use</h2>
              <p>We use the following types of cookies:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-600">
                <li>
                  <strong>Authentication cookies:</strong> HttpOnly, secure session cookies
                  that keep you logged in. These are set by our backend and are not accessible
                  to JavaScript.
                </li>
                <li>
                  <strong>CSRF protection cookies:</strong> Used to prevent cross-site
                  request forgery on state-changing actions.
                </li>
                <li>
                  <strong>Preference cookies:</strong> Remember your language, theme, and
                  estimator inputs.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">3. Third-Party Services</h2>
              <p>
                Our website embeds Google Maps for location display. Google may set cookies
                in accordance with their own privacy policy. We do not use advertising or
                tracking cookies unless you consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">4. Managing Cookies</h2>
              <p>
                You can control or delete cookies through your browser settings. Blocking
                authentication cookies may prevent you from logging in or using protected
                features.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">5. Contact Us</h2>
              <p>
                For questions about this Cookie Policy, contact us at:
              </p>
              <p className="text-sm text-gray-600">
                <strong>Janai Landscape Services</strong><br />
                Email: contact@janailandscape.com<br />
                Phone: +91 97676 71968
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
